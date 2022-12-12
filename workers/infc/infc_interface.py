# Code generated by moonworm : https://github.com/bugout-dev/moonworm
# Moonworm version : 0.5.3
import json
import os
from typing import Any, Dict, Union

from eth_typing.evm import Address, ChecksumAddress
from web3 import Web3
from web3.contract import ContractFunction

from .web3_util import *

abi_path = os.path.join(os.path.dirname(__file__), "infc_abi.json")
with open(abi_path, "r") as abi_file:
    CONTRACT_ABI = json.load(abi_file)


class Contract:
    def __init__(self, web3: Web3, contract_address: ChecksumAddress):
        self.web3 = web3
        self.address = contract_address
        self.contract = web3.eth.contract(address=self.address, abi=CONTRACT_ABI)

    @staticmethod
    def constructor(name_: str, symbol_: str) -> ContractConstructor:
        return ContractConstructor(name_, symbol_)

    def addManager(self, _manager: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.addManager(_manager)

    def approve(self, to: ChecksumAddress, tokenId: int) -> ContractFunction:
        return self.contract.functions.approve(to, tokenId)

    def balanceOf(self, owner: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.balanceOf(owner)

    def baseURI(self) -> ContractFunction:
        return self.contract.functions.baseURI()

    def burn(self, _tokenId: int) -> ContractFunction:
        return self.contract.functions.burn(_tokenId)

    def getApproved(self, tokenId: int) -> ContractFunction:
        return self.contract.functions.getApproved(tokenId)

    def isApprovedForAll(
        self, owner: ChecksumAddress, operator: ChecksumAddress
    ) -> ContractFunction:
        return self.contract.functions.isApprovedForAll(owner, operator)

    def isManager(self, _manager: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.isManager(_manager)

    def mint(self, _to: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.mint(_to)

    def name(self) -> ContractFunction:
        return self.contract.functions.name()

    def owner(self) -> ContractFunction:
        return self.contract.functions.owner()

    def ownerOf(self, tokenId: int) -> ContractFunction:
        return self.contract.functions.ownerOf(tokenId)

    def pause(self) -> ContractFunction:
        return self.contract.functions.pause()

    def paused(self) -> ContractFunction:
        return self.contract.functions.paused()

    def removeManager(self, _manager: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.removeManager(_manager)

    def renounceOwnership(self) -> ContractFunction:
        return self.contract.functions.renounceOwnership()

    def safeTransferFrom(
        self, from_: ChecksumAddress, to: ChecksumAddress, tokenId: int
    ) -> ContractFunction:
        return self.contract.functions.safeTransferFrom(from_, to, tokenId)

    def safeTransferFrom(
        self, from_: ChecksumAddress, to: ChecksumAddress, tokenId: int, _data: bytes
    ) -> ContractFunction:
        return self.contract.functions.safeTransferFrom(from_, to, tokenId, _data)

    def setApprovalForAll(
        self, operator: ChecksumAddress, approved: bool
    ) -> ContractFunction:
        return self.contract.functions.setApprovalForAll(operator, approved)

    def setBaseURI(self, baseURI_: str) -> ContractFunction:
        return self.contract.functions.setBaseURI(baseURI_)

    def supportsInterface(self, interfaceId: bytes) -> ContractFunction:
        return self.contract.functions.supportsInterface(interfaceId)

    def symbol(self) -> ContractFunction:
        return self.contract.functions.symbol()

    def tokenURI(self, tokenId: int) -> ContractFunction:
        return self.contract.functions.tokenURI(tokenId)

    def totalSupply(self) -> ContractFunction:
        return self.contract.functions.totalSupply()

    def transferFrom(
        self, from_: ChecksumAddress, to: ChecksumAddress, tokenId: int
    ) -> ContractFunction:
        return self.contract.functions.transferFrom(from_, to, tokenId)

    def transferOwnership(self, newOwner: ChecksumAddress) -> ContractFunction:
        return self.contract.functions.transferOwnership(newOwner)

    def unpause(self) -> ContractFunction:
        return self.contract.functions.unpause()


def deploy(
    web3: Web3,
    contract_constructor: ContractFunction,
    contract_bytecode: str,
    deployer_address: ChecksumAddress,
    deployer_private_key: str,
) -> Contract:
    tx_hash, contract_address = deploy_contract_from_constructor_function(
        web3,
        constructor=contract_constructor,
        contract_bytecode=contract_bytecode,
        contract_abi=CONTRACT_ABI,
        deployer=deployer_address,
        deployer_private_key=deployer_private_key,
    )
    return Contract(web3, contract_address)