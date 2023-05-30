import config from "../hardhat.config";
import { task } from "hardhat/config";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";

task("deploy", "Deploy Mental Poker").setAction(pctest);

async function pctest({}, hre: HardhatRuntimeEnvironment) {
  try {
    const MentalPoker = await hre.ethers.getContractFactory("MentalPoker");
    const mentalPoker = await MentalPoker.deploy({
      gasPrice: hre.ethers.provider.getGasPrice(),
    });
    // await mentalPoker.deployTransaction.wait();
    await mentalPoker.deployed();
    console.log("MentalPoker deployed to ", mentalPoker.address);
  } catch (err) {
    console.log("error: ", err);
  }
}
