import fs from "fs";
import { task, types } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";
import { expect } from "chai";
// const wasm = require("./pkg/zkcard_wasm.js");
import {
  setup,
  keygen,
  computeRevealToken,
  CardRand,
  MaskedCard,
  VRevealToken,
  reveal,
  Permutation,
  VMaskedCard,
  shuffleAndRemask,
  AggregatePublicKey,
} from "../pkg/zkcard_wasm_rs";

task("mt", "Mental Poker Test")
  .addOptionalParam(
    "contr",
    "contract address",
    "0x0000000000000000000000000000000000003000",
    types.string
  )
  .setAction(pctest);

const abipath = "./abi/contracts/MentalPokerTest.sol/MentalPokerTest.json";
var url: string;
var abi: string;
if (fs.existsSync(abipath)) {
  abi = JSON.parse(fs.readFileSync(abipath).toString());
}

async function pctest(args: { contr: string }, hre: HardhatRuntimeEnvironment) {
  url = hre.userConfig.networks![hre.network.name].url!;

  console.log("HTTP URL: ", url);

  const provider = new ethers.providers.JsonRpcProvider(url);
  const myContr = new ethers.Contract(args.contr, abi, provider);

  try {
    {
      let m = 4;
      let n = 13;
      let rand = CardRand.buildRand();
      let parameters = setup(rand, m, n);
      let gameKeyAndProof = keygen(rand, parameters, "Alice");
      let maskedCard = MaskedCard.rand(rand);
      let publicKey = gameKeyAndProof.getPubKey();
      let secretKey = gameKeyAndProof.getSecKey();
      let revealTokenAndProof = computeRevealToken(
        rand,
        parameters,
        secretKey,
        publicKey,
        maskedCard
      );
      let revealToken = revealTokenAndProof.getRevealToken();
      let revealProof = revealTokenAndProof.getRevealProof();

      let params = Buffer.from(parameters.serialAndEnbase64(), "base64");
      let pub_key = Buffer.from(publicKey.serialAndEnbase64(), "base64");
      let reveal_token = Buffer.from(revealToken.serialAndEnbase64(), "base64");
      let masked = Buffer.from(maskedCard.serialAndEnbase64(), "base64");
      let reveal_proof = Buffer.from(revealProof.serialAndEnbase64(), "base64");

      expect(
        await myContr.verifyReveal(
          params,
          pub_key,
          reveal_token,
          masked,
          reveal_proof
        )
      ).to.eql(true);

      console.log("verifyReveal contract call successful!!!");
    }

    {
      let m = 4;
      let n = 13;
      let rand = CardRand.buildRand();
      let parameters = setup(rand, m, n);
      let gameKeyAndProof = keygen(rand, parameters, "Alice");
      let publicKey = gameKeyAndProof.getPubKey();
      let keyownershipProof = gameKeyAndProof.getProof();

      let params = Buffer.from(parameters.serialAndEnbase64(), "base64");
      let pub_key = Buffer.from(publicKey.serialAndEnbase64(), "base64");
      let memo = Buffer.from("Alice");
      let keyProof = Buffer.from(
        keyownershipProof.serialAndEnbase64(),
        "base64"
      );

      expect(
        await myContr.verifyKeyOwnership(params, pub_key, memo, keyProof)
      ).to.eql(true);

      console.log("verifyKeyOwnership contract call successful!!!");
    }

    {
      let m = 4;
      let n = 13;
      let rand = CardRand.buildRand();
      let maskedCard = MaskedCard.rand(rand);
      let masked = Buffer.from(maskedCard.serialAndEnbase64(), "base64");

      let revealTokens = VRevealToken.newVRevealToken();
      let reveal_tokens = [];

      for (let i = 0; i < 10; i++) {
        let parameters = setup(rand, m, n);
        let gameKeyAndProof = keygen(rand, parameters, "Alice");
        let publicKey = gameKeyAndProof.getPubKey();
        let secretKey = gameKeyAndProof.getSecKey();
        let revealTokenAndProof = computeRevealToken(
          rand,
          parameters,
          secretKey,
          publicKey,
          maskedCard
        );
        let revealToken = revealTokenAndProof.getRevealToken();

        revealTokens.push(revealToken);
        let reveal_token = Buffer.from(
          revealToken.serialAndEnbase64(),
          "base64"
        );
        reveal_tokens.push(reveal_token);
      }

      let cards1 = reveal(revealTokens, maskedCard).serialAndEnbase64();
      let cards2 = ethers.utils.toUtf8String(
        await myContr.reveal(reveal_tokens, masked)
      );

      expect(cards1).to.eql(cards2);

      console.log("reveal contract call successful!!!");
    }

    {
      let m = 4;
      let n = 13;
      let num_of_players = 4;

      let rand = CardRand.buildRand();
      let parameters = setup(rand, m, n);

      let pub_keys = [];
      for (let i = 0; i < num_of_players; i++) {
        let gameKeyAndProof = keygen(rand, parameters, "Alice");
        let pubkey = gameKeyAndProof.getPubKey();
        pub_keys.push(Buffer.from(pubkey.serialAndEnbase64(), "base64"));
      }

      let aggregate_key = AggregatePublicKey.debase64AndDeserial(
        ethers.utils.toUtf8String(await myContr.computeAggregateKey(pub_keys))
      );

      console.log("computeAggregateKey contract call successful!!!");

      let cur_decks = [];
      let deck = VMaskedCard.newVMaskedCard();
      for (let i = 0; i < n * m; i++) {
        let maskedcard = MaskedCard.rand(rand);
        deck.push(maskedcard);
        cur_decks.push(Buffer.from(maskedcard.serialAndEnbase64(), "base64"));
      }

      let permutation2 = Permutation.newPermutation(rand, m * n);

      let maskedCardsAndShuffleProof = shuffleAndRemask(
        rand,
        parameters,
        aggregate_key,
        deck,
        permutation2
      );

      let shuffledDecks = maskedCardsAndShuffleProof.getMaskedCards();
      let shuffleProof = maskedCardsAndShuffleProof.getShuffleProof();

      let new_decks = shuffledDecks
        .serialAndEnbase64()
        .map((v) => Buffer.from(v, "base64"));

      let params = Buffer.from(parameters.serialAndEnbase64(), "base64");
      let shared_key = Buffer.from(aggregate_key.serialAndEnbase64(), "base64");
      let shuffle_proof = Buffer.from(
        shuffleProof.serialAndEnbase64(),
        "base64"
      );

      expect(
        await myContr.verifyShuffle(
          params,
          shared_key,
          cur_decks,
          new_decks,
          shuffle_proof
        )
      ).to.eql(true);

      console.log("verifyShuffle contract call successful!!!");
    }
  } catch (err) {
    console.log("error: ", err);
  }
}
