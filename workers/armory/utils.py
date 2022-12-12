import os
from enum import Enum

MOONSTREAM_DB_LABEL = "moonworm-alpha"

MOONSTREAM_S3_PUBLIC_DATA_BUCKET = os.getenv("MOONSTREAM_S3_PUBLIC_DATA_BUCKET")
if MOONSTREAM_S3_PUBLIC_DATA_BUCKET is None:
    raise ValueError(
        "MOONSTREAM_S3_PUBLIC_DATA_BUCKET environment variable must be set"
    )
MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX = os.getenv(
    "MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX"
)
if MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX is None:
    raise ValueError(
        "MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX environment variable must be set"
    )

CHAMPIONS_ASCENSION_PEC_ADDRESS = os.getenv("CHAMPIONS_ASCENSION_PEC_ADDRESS")
if CHAMPIONS_ASCENSION_PEC_ADDRESS is None:
    raise ValueError("CHAMPIONS_ASCENSION_PEC_ADDRESS environment variable must be set")
CHAMPIONS_ASCENSION_CAP_ADDRESS = os.getenv("CHAMPIONS_ASCENSION_CAP_ADDRESS")
if CHAMPIONS_ASCENSION_CAP_ADDRESS is None:
    raise ValueError("CHAMPIONS_ASCENSION_CAP_ADDRESS environment variable must be set")
INFLUENCE_INFC_ADDRESS = os.getenv("INFLUENCE_INFC_ADDRESS")
if INFLUENCE_INFC_ADDRESS is None:
    raise ValueError("INFLUENCE_INFC_ADDRESS environment variable must be set")


class TokenTypes(Enum):
    PEC = "pec"
    CAP = "cap"
    INFC = "infc"


def get_token_bucket_file_path(token_type: str) -> str:
    s3_file_path = ""
    if token_type == TokenTypes.PEC.name:
        s3_file_path = f"{MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX}/armory/champions_ascension/pec/data.json"
    elif token_type == TokenTypes.CAP.name:
        s3_file_path = f"{MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX}/armory/champions_ascension/cap/data.json"
    elif token_type == TokenTypes.INFC.name:
        s3_file_path = (
            f"{MOONSTREAM_S3_PUBLIC_DATA_BUCKET_PREFIX}/armory/influence/infc/data.json"
        )
    else:
        raise Exception(f"Unknown token type: {token_type}")

    return s3_file_path


def get_contract_address(token_type: str) -> str:
    address_str = ""
    if token_type == TokenTypes.PEC.name:
        address_str = CHAMPIONS_ASCENSION_PEC_ADDRESS
    elif token_type == TokenTypes.CAP.name:
        address_str = CHAMPIONS_ASCENSION_CAP_ADDRESS
    elif token_type == TokenTypes.INFC.name:
        address_str = INFLUENCE_INFC_ADDRESS
    else:
        raise Exception(f"Unknown token type: {token_type}")

    return address_str
