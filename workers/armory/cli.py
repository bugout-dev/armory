import argparse
import csv
import json
import logging
import os
import time
from concurrent.futures import Future, ThreadPoolExecutor, wait
from enum import Enum
from typing import Any, Dict, List, Tuple

import boto3
import requests
import web3
from moonstreamdb.db import yield_db_read_only_session_ctx
from sqlalchemy.sql import text
from tqdm import tqdm

from infc.infc_interface import Contract
from infc.web3_util import connect

from .utils import (
    MOONSTREAM_DB_LABEL,
    MOONSTREAM_S3_PUBLIC_DATA_BUCKET,
    TokenTypes,
    get_contract_address,
    get_token_bucket_file_path,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class OutputType(Enum):
    csv = "csv"
    json = "json"
    jsonl = "jsonl"


def parse_input(args_input: str) -> Tuple[str, str]:
    if not os.path.exists(args_input):
        raise Exception(f"File {args_input} does not exist")

    input_path_raw = ".".join(args_input.rstrip(".").split(".")[:-1])
    input_name = input_path_raw.rstrip("/").split("/")[-1]

    return args_input, input_name


def parse_output(
    args_output: str,
    args_overwrite: bool,
    format_output: str,
    name: str = "data",
    suffix: str = "",
) -> str:
    output_path = (
        args_output
        if args_output is not None
        else f"data/{name}{suffix}.{format_output}"
    )
    if os.path.exists(output_path):
        if not args_overwrite:
            raise Exception(
                f"File {output_path} already exists, please set 'overwrite' flag to use same path"
            )
        else:
            os.remove(output_path)

    return output_path


def fetch_tokens_db_data(address: str, greater: int = 1) -> List[Tuple[int, str]]:
    """
    Fetch events data for specified address and label from database.
    """
    with yield_db_read_only_session_ctx() as db_session:
        stmt = text(
            """
            SELECT 
                DISTINCT ON((label_data -> 'args' ->> 'tokenId') :: INT) (label_data -> 'args' ->> 'tokenId') :: text as token_id, 
                label_data -> 'args' ->> 'to' as current_owner 
            FROM ethereum_labels 
            WHERE 
                address = :address
                AND  label = :label
                AND label_data ->> 'type' = 'event'
                AND label_data ->> 'name' = 'Transfer'
                AND (label_data -> 'args' ->> 'tokenId') :: INT >= :greater
            ORDER BY
                (label_data -> 'args' ->> 'tokenId') :: INT ASC,
                block_number :: INT DESC,
                log_index :: INT DESC
            """
        )
        db_result = db_session.execute(
            stmt,
            {
                "address": address,
                "label": MOONSTREAM_DB_LABEL,
                "greater": greater,
            },
        )
        # data_keys = db_result.keys()
        data_rows = db_result.fetchall()
        logger.info(f"Fetched {len(data_rows)} tokens from database")

    return data_rows


def get_data_from_token_uri(url: str) -> Tuple[str, Dict[str, Any]]:
    name = ""
    cnt = 1
    while cnt <= 5:
        try:
            req_result = requests.get(url=url)
            data = req_result.json()
            name = data["name"]
            attributes = data["attributes"]
            break
        except Exception as e:
            logger.error(f"Failed fetch data from uri: {url} with err: {str(e)}")
            cnt += 1
            time.sleep(10 * cnt)

    if name == "":
        raise Exception("Unable to fetch data, unlucky..")

    return name, attributes


def prepare_token_data(
    token_uri_prefix: str, token: Tuple[str, str], uri_data: bool
) -> Dict[str, Any]:
    """
    Combine token data to object and populate with uri information if uri_data equals True.
    """
    token_id = token[0]
    current_owner = token[1]
    url = f"{token_uri_prefix}{token_id}"

    name = ""
    attributes = {}

    if uri_data:
        name, attributes = get_data_from_token_uri(url=url)

    return {
        "token_id": int(token_id),
        "token_uri": url,
        "current_owner": current_owner,
        "name": name,
        "attributes": attributes,
    }


def tokens_fetch_handler(args: argparse.Namespace) -> None:
    """
    Fetch tokens from database and extend with data from token_uri.
    """
    output_path = parse_output(
        args_output=args.output,
        args_overwrite=args.overwrite,
        format_output="jsonl",
    )

    web3 = connect(web3_uri=args.web3)
    address_str = get_contract_address(token_type=args.token_type)
    if address_str == "":
        return

    contract = Contract(web3=web3, contract_address=web3.toChecksumAddress(address_str))
    token_uri_first = contract.tokenURI(_tokenId=1).call()
    token_uri_prefix = token_uri_first.rstrip("/")[:-1]

    data_rows = fetch_tokens_db_data(address=address_str, greater=args.greater)

    # Split list to chunks to avoid overload API
    chunk_item_size = 5
    tokens_num = len(data_rows)
    chunks = [
        data_rows[i : i + chunk_item_size]
        for i in range(0, tokens_num, chunk_item_size)
    ]

    pbar = tqdm(total=tokens_num)
    pbar.set_description(f"Populating tokens with uri data for {tokens_num} tokens")

    for chunk in chunks:
        futures: List[Future] = []

        # Prepare token data (also populates with uri information for API)
        # for each chunk with size equal chunk_item_size continuously
        with ThreadPoolExecutor() as executor:
            for token in chunk:
                feature = executor.submit(
                    prepare_token_data, token_uri_prefix, token, args.uri_data
                )
                futures.append(feature)

        wait(futures)

        temp_tokens = []
        for future in futures:
            result = future.result()
            temp_tokens.append(result)

        # Sort one more time for sure
        sorted_temp_tokens = sorted(temp_tokens, key=lambda i: i["token_id"])
        for token in sorted_temp_tokens:
            with open(output_path, "a", encoding="utf-8") as ofp:
                json.dump(token, ofp)
                ofp.write("\n")

        pbar.update(len(chunk))

        if args.uri_data:
            time.sleep(0.5)


def tokens_update_handler(args: argparse.Namespace) -> None:
    """
    Updates tokens data in provided input file with latest data from database and token_uri.
    """
    _, input_name = parse_input(args.input)
    output_path = parse_output(
        args_input=args.input,
        args_output=args.output,
        args_overwrite=args.overwrite,
        name=input_name,
        format_output="jsonl",
    )

    address_str = get_contract_address(token_type=args.token_type)

    if args.current_owner:
        data_rows = fetch_tokens_db_data(address=address_str)

    with open(args.input, "r", encoding="utf-8") as ifp:
        lines = ifp.readlines()
        tokens_num = len(lines)

        pbar = tqdm(total=tokens_num)
        pbar.set_description(f"Updating {tokens_num} tokens")

        cnt = 1
        for line in lines:
            token = json.loads(line)
            if token["token_id"] != cnt:
                logger.error(
                    f"Incorrect order of counter id {cnt} and token in file {token['token_id']}"
                )
                return

            if args.current_owner:
                if len(lines) != len(data_rows):
                    logger.error(
                        f"Different length of tokens in file {len(lines)} and in database {len(data_rows)}"
                    )
                    return

                token_db_data = data_rows[cnt - 1]
                token_db_id = int(token_db_data[0])
                token_db_current_owner = token_db_data[1]
                if token_db_id != cnt:
                    logger.error(
                        f"Incorrect order of counter id {cnt} and token in database {token_db_id}"
                    )
                    return

                token["current_owner"] = token_db_current_owner

            if args.uri_data:
                # TODO(kompotkot): Add multi thread here
                name, attributes = get_data_from_token_uri(url=token["token_uri"])

                token["name"] = name
                token["attributes"] = attributes

            with open(output_path, "a", encoding="utf-8") as ofp:
                json.dump(token, ofp)
                ofp.write("\n")

            cnt += 1
            pbar.update(1)


def tokens_convert_handler(args: argparse.Namespace) -> None:
    """
    Converts JSONL to CSV/JSON format.
    """
    _, input_name = parse_input(args.input)
    output_path = parse_output(
        args_output=args.output,
        args_overwrite=args.overwrite,
        format_output=OutputType(args.output_type).value,
        name=input_name,
    )

    with open(args.input, "r", encoding="utf-8") as ifp:
        lines = ifp.readlines()
        tokens_num = len(lines)

        cnt = 1
        pbar = tqdm(total=tokens_num)
        pbar.set_description(f"Converting {tokens_num} tokens")

        with open(output_path, "w", encoding="utf-8") as ofp:
            headers_common = []
            headers_attr = []

            # Prepare headers
            for line in lines:
                line_json = json.loads(line)
                if len(line_json.keys()) > len(headers_common):
                    headers_common = [k for k in line_json.keys()]
                for attr in line_json["attributes"]:
                    # Its slow, but tokens has different length of attributes
                    if attr["trait_type"] not in headers_attr:
                        headers_attr.append(attr["trait_type"])

            headers_attr.sort()

            out_lines_csv = []
            out_lines_json = []

            for line in lines:
                line_json = json.loads(line)

                out_line_csv = []
                out_line_json = {}

                for header in headers_common:
                    # Flat attributes
                    # [{"name1": "val"}, {"name2": "val"}] -> {"name1": "val", "name2": "val"}
                    if header == "attributes":
                        temp_attr_dict = {
                            attr["trait_type"]: attr["value"]
                            for attr in line_json[header]
                        }
                        for attr in headers_attr:
                            if OutputType(args.output_type) == OutputType.csv:
                                out_line_csv.append(temp_attr_dict.get(attr, ""))
                            elif OutputType(args.output_type) == OutputType.json:
                                out_line_json[attr] = temp_attr_dict.get(attr, "")
                    else:
                        if OutputType(args.output_type) == OutputType.csv:
                            out_line_csv.append(line_json[header])
                        elif OutputType(args.output_type) == OutputType.json:
                            out_line_json[header] = line_json[header]

                if OutputType(args.output_type) == OutputType.csv:
                    out_lines_csv.append(out_line_csv)
                elif OutputType(args.output_type) == OutputType.json:
                    out_lines_json.append(out_line_json)

                cnt += 1
                pbar.update(1)

            if OutputType(args.output_type) == OutputType.csv:
                headers_common.remove("attributes")
                headers_csv = headers_common + headers_attr

                writer = csv.writer(ofp, quoting=csv.QUOTE_NONNUMERIC)
                writer.writerow(headers_csv)
                for row in out_lines_csv:
                    writer.writerow(row)

            elif OutputType(args.output_type) == OutputType.json:
                json.dump(out_lines_json, ofp)

    logger.info(f"Converted {tokens_num} tokens and saved to file {output_path}")


def tokens_filter_handler(args: argparse.Namespace) -> None:
    """
    Filter JSONL data input with list of addresses.
    """
    if not os.path.exists(args.addresses):
        logger.error(f"File {args.addresses} does not exist")
        return

    _, input_name = parse_input(args.input)
    output_path = parse_output(
        args_output=args.output,
        args_overwrite=args.overwrite,
        name=input_name,
        suffix="_filtered",
        format_output="jsonl",
    )

    filtered_tokens = []

    with open(args.input, "r", encoding="utf-8") as ifp:
        lines = ifp.readlines()
        with open(args.addresses, "r", encoding="utf-8") as afp:
            addresses = afp.read().splitlines()
            addresses_lower = []
            for addr in addresses:
                addresses_lower.append(addr.lower())

            for line in lines:
                line_json = json.loads(line)
                input_address: str = line_json["current_owner"]

                if input_address.lower() in addresses_lower:
                    filtered_tokens.append(line)

    filtered_tokens_num = len(filtered_tokens)
    for token in filtered_tokens:
        with open(output_path, "a", encoding="utf-8") as ofp:
            ofp.write(token)

    logger.info(
        f"Filtered {filtered_tokens_num} tokens and saved to file {output_path}"
    )


def workers_download_handler(args: argparse.Namespace) -> None:
    """
    Downloads data from S3 bucket.
    """
    output_dir = args.dir.rstrip("/")
    s3_file_path = get_token_bucket_file_path(args.token_type)

    s3 = boto3.resource("s3")
    try:
        s3.Bucket(MOONSTREAM_S3_PUBLIC_DATA_BUCKET).download_file(
            s3_file_path, f"{output_dir}/{args.token_type.value}.json"
        )
    except Exception as e:
        raise Exception(str(e))

    logger.info(f"File {args.token_type.value} downloaded")


def workers_refresh_handler(args: argparse.Namespace) -> None:
    """
    Fetch current_owners for token, updated local data file and upload to S3 bucket.
    """
    data_file_path = f"data/{TokenTypes[args.token_type].value}.json"
    s3_file_path = get_token_bucket_file_path(args.token_type)

    address_str = get_contract_address(token_type=args.token_type)
    db_rows = fetch_tokens_db_data(address=address_str)

    with open(data_file_path, "r", encoding="utf-8") as ifp:
        input_data_json = json.load(ifp)

    if len(input_data_json) != len(db_rows):
        raise Exception(
            f"Different length of tokens in file {len(input_data_json)} and in database {len(db_rows)}"
        )

    updated_cnt = 0
    updated_lst = []
    for i, db_token in enumerate(db_rows):
        if input_data_json[i]["token_id"] == int(db_token[0]):
            token = input_data_json[i]
        else:
            # Use slow method if order is different
            token = list(
                filter(lambda x: x["token_id"] == int(db_token[0]), input_data_json)
            )[0]

        if token["current_owner"] != db_token[1]:
            token["current_owner"] = db_token[1]
            updated_cnt += 1

        updated_lst.append(token)

    logger.info(f"Updated current owner in {updated_cnt} {args.token_type} tokens")
    data = json.dumps(updated_lst)

    if updated_cnt != 0:
        with open(data_file_path, "w", encoding="utf-8") as ofp:
            logger.info(f"Updated file {data_file_path}")
            ofp.write(data)

    try:
        s3 = boto3.client("s3")
        s3.put_object(
            Body=data,
            Bucket=MOONSTREAM_S3_PUBLIC_DATA_BUCKET,
            Key=s3_file_path,
            ContentType="application/json",
            Metadata={"armory": "data"},
        )
        logger.info(
            f"Uploaded file {data_file_path} to s3://{MOONSTREAM_S3_PUBLIC_DATA_BUCKET}/{s3_file_path}"
        )
    except Exception as e:
        raise Exception(str(e))


def main() -> None:
    parser = argparse.ArgumentParser(description="Armory CLI")
    parser.set_defaults(func=lambda _: parser.print_help())
    subcommands = parser.add_subparsers(description="Armory commands")

    # Armory data preparation
    parser_armory_workers = subcommands.add_parser(
        "workers", description="Workers commands"
    )
    parser_armory_workers.set_defaults(
        func=lambda _: parser_armory_workers.print_help()
    )
    subcommands_armory_workers = parser_armory_workers.add_subparsers(
        description="Workers commands"
    )

    parser_workers_download = subcommands_armory_workers.add_parser(
        "download", description="Download existing data from S3"
    )
    parser_workers_download.add_argument(
        "--token_type",
        required=True,
        help=f"Available contracts: {[member.name for member in TokenTypes]}",
    )
    parser_workers_download.add_argument(
        "-d",
        "--dir",
        type=str,
        default="data",
        help="Output directory path, default: data",
    )
    parser_workers_download.set_defaults(func=workers_download_handler)

    parser_workers_refresh = subcommands_armory_workers.add_parser(
        "refresh", description="Refresh and upload to S3 data for Armory"
    )
    parser_workers_refresh.add_argument(
        "--token_type",
        required=True,
        help=f"Available contracts: {[member.name for member in TokenTypes]}",
    )
    parser_workers_refresh.set_defaults(func=workers_refresh_handler)

    # Tokens manipulations
    parser_armory_tokens = subcommands.add_parser(
        "tokens", description="Tokens commands"
    )
    parser_armory_tokens.set_defaults(func=lambda _: parser_armory_tokens.print_help())
    subcommands_armory_tokens = parser_armory_tokens.add_subparsers(
        description="Tokens commands"
    )

    parser_tokens_fetch = subcommands_armory_tokens.add_parser(
        "fetch", description="Fetch all tokens"
    )
    parser_tokens_fetch.add_argument(
        "--token_type",
        required=True,
        help=f"Available contracts: {[member.name for member in TokenTypes]}",
    )
    parser_tokens_fetch.add_argument(
        "--web3",
        type=str,
        required=True,
        help="Web3 provider URL",
    )
    parser_tokens_fetch.add_argument(
        "--uri_data", action="store_true", help="Fetch uri data in flag specified"
    )
    parser_tokens_fetch.add_argument(
        "-o",
        "--output",
        type=str,
        help="Output JSONL file path, default: data/<token_type>_tokens.jsonl",
    )
    parser_tokens_fetch.add_argument(
        "-g",
        "--greater",
        default=1,
        type=int,
        help="Start with token_id greater then",
    )
    parser_tokens_fetch.add_argument(
        "--overwrite", action="store_true", help="Overwrite file if exists"
    )
    parser_tokens_fetch.set_defaults(func=tokens_fetch_handler)

    parser_tokens_update = subcommands_armory_tokens.add_parser(
        "update", description="Update tokens data"
    )
    parser_tokens_update.add_argument(
        "--token_type",
        required=True,
        help=f"Available contracts: {[member.name for member in TokenTypes]}",
    )
    parser_tokens_update.add_argument(
        "--web3",
        type=str,
        required=True,
        help="Web3 provider URL",
    )
    parser_tokens_update.add_argument(
        "--current_owner", action="store_true", help="Update current owner data"
    )
    parser_tokens_update.add_argument(
        "--uri_data", action="store_true", help="Update token uri data"
    )
    parser_tokens_update.add_argument(
        "-i",
        "--input",
        type=str,
        help="Input JSONL file path, default: data/<token_type>_tokens.jsonl",
    )
    parser_tokens_update.add_argument(
        "-o",
        "--output",
        type=str,
        help="Output JSONL file path, default: data/<token_type>_tokens.jsonl",
    )
    parser_tokens_update.add_argument(
        "--overwrite", action="store_true", help="Overwrite file if exists"
    )
    parser_tokens_update.set_defaults(func=tokens_update_handler)

    parser_tokens_convert = subcommands_armory_tokens.add_parser(
        "convert", description="Convert tokens data"
    )
    parser_tokens_convert.add_argument(
        "-i",
        "--input",
        required=True,
        type=str,
        help="Input JSONL file path",
    )
    parser_tokens_convert.add_argument(
        "-o",
        "--output",
        type=str,
        help="Output CSV file path, default: data/<input_file_name>.csv",
    )
    parser_tokens_convert.add_argument(
        "-t",
        "--output_type",
        type=str,
        default="csv",
        help=f"Available output types: {[member.name for member in OutputType]}, default: csv",
    )
    parser_tokens_convert.add_argument(
        "--overwrite", action="store_true", help="Overwrite file if exists"
    )
    parser_tokens_convert.set_defaults(func=tokens_convert_handler)

    parser_tokens_filter = subcommands_armory_tokens.add_parser(
        "filter", description="Filter tokens data"
    )
    parser_tokens_filter.add_argument(
        "-i",
        "--input",
        type=str,
        required=True,
        help="Input JSONL file path",
    )
    parser_tokens_filter.add_argument(
        "-o",
        "--output",
        type=str,
        help="Output file path, default: data/<input_file_name>.jsonl",
    )
    parser_tokens_filter.add_argument(
        "-a",
        "--addresses",
        type=str,
        required=True,
        help="List of addresses to use as a filter",
    )
    parser_tokens_filter.add_argument(
        "--overwrite", action="store_true", help="Overwrite file if exists"
    )
    parser_tokens_filter.set_defaults(func=tokens_filter_handler)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
