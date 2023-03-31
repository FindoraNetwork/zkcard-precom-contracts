// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./IMentalPoker.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MentalPoker is IMentalPoker  {
    constructor() {    
    }

    function verifyKeyOwnership(
        bytes calldata params,
        bytes calldata pubKey,
        bytes calldata memo,
        bytes calldata keyProof
    ) public view returns (bool) {
        return true;
    }


    function computeAggregateKey(bytes[] calldata pubKeys
    ) public view returns (bytes memory) {
        return "call computeAggregateKey";
    }

    function mask(
        bytes calldata params,
        bytes calldata sharedKey,
        bytes calldata encoded
    ) public view returns (bytes memory) {
        return "call mask";    
    }

    function verifyShuffle(
        bytes calldata params,
        bytes calldata sharedKey,
        bytes[] calldata curDeck,
        bytes[] calldata newDeck,
        bytes calldata shuffleProof
    ) public view returns (bool) {
        return true;
    }


    function verifyReveal(
        bytes calldata params,
        bytes calldata pubKey,
        bytes calldata revealToken,
        bytes calldata masked,
        bytes calldata revealProof
    ) public view returns (bool) {
        return true;
    }


    function reveal(bytes[] calldata revealTokens, bytes calldata masked
    ) public view returns (bytes memory) {
        return "call reveal";
    }


    function test(bytes calldata param1, bytes[] calldata param2
    ) external view returns (bytes memory) {
        return "call test";
    }
}
