import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { types } from "hardhat/config";

describe("MentalPokerTest", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const MentalPoker = await ethers.getContractFactory("MentalPoker");
    const mentalPoker = await MentalPoker.deploy();
    await mentalPoker.deployed();
    console.log("MentalPoker deployed to ", mentalPoker.address);

    const MentalPokerTest = await ethers.getContractFactory("MentalPokerTest");
    const mentalPokerTest = await MentalPokerTest.deploy(mentalPoker.address);
    await mentalPokerTest.deployed();

    console.log("MentalPokerTest deployed to ", mentalPokerTest.address);

    return { mentalPokerTest };
  }

  describe("MentalPoker Contract Test", function () {
    it("Should set output right", async function () {
      const { mentalPokerTest } = await loadFixture(deployOneYearLockFixture);
      expect(
        await mentalPokerTest.verifyKeyOwnership("0x", "0x", "0x", "0x")
      ).to.eql(true);
      expect(
        ethers.utils.toUtf8String(await mentalPokerTest.computeAggregateKey([]))
      ).to.eql("call computeAggregateKey");
      expect(
        ethers.utils.toUtf8String(await mentalPokerTest.mask("0x", "0x", "0x"))
      ).to.eql("call mask");
      expect(
        await mentalPokerTest.verifyShuffle("0x", "0x", [], [], "0x")
      ).to.eql(true);
      expect(
        await mentalPokerTest.verifyReveal("0x", "0x", "0x", "0x", "0x")
      ).to.eql(true);
      expect(
        ethers.utils.toUtf8String(await mentalPokerTest.reveal([], "0x"))
      ).to.eql("call reveal");
    });
  });
});
