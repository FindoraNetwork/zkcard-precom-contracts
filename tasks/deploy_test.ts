import config from "../hardhat.config";
import { task, types } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";

task("deploy-test", "Deploy Mental Poker Test")
  .addOptionalParam("contr", "contract address", undefined, types.string)
  .setAction(pctest);

async function pctest(args: { contr: string }, hre: HardhatRuntimeEnvironment) {
  try {
    const MentalPokerTest = await hre.ethers.getContractFactory(
      "MentalPokerTest"
    );
    const mentalPokerTest = await MentalPokerTest.deploy(args.contr, {
      gasPrice: hre.ethers.provider.getGasPrice(),
    });
    // await mentalPokerTest.deployTransaction.wait();
    await mentalPokerTest.deployed();
    console.log("MentalPokerTest deployed to ", mentalPokerTest.address);
  } catch (err) {
    console.log("error: ", err);
  }
}
