import logging
import os
from enum import Enum
from typing import Any

logger = logging.getLogger(__name__)

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
    pec = CHAMPIONS_ASCENSION_PEC_ADDRESS
    cap = CHAMPIONS_ASCENSION_CAP_ADDRESS
    infc = INFLUENCE_INFC_ADDRESS


def get_contract_address(token_type: str) -> str:
    address_str = ""
    if token_type == TokenTypes.pec.name:
        address_str = TokenTypes.pec.value
    elif token_type == TokenTypes.cap.name:
        address_str = TokenTypes.cap.value
    elif token_type == TokenTypes.infc.name:
        address_str = TokenTypes.infc.value
    else:
        logger.error(f"Unknown token type: {token_type}")

    return address_str
