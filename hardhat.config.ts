import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-ganache";
import "./tasks/test";
import "./tasks/deploy";
import "./tasks/deploy_test";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey:
            "0x6021ba41d6df4b515fb6013c5b3c4fac9c0b39cd3c44b657a3db6ec4321b71ea",
          balance: "100000000000000000000000000",
        },
      ],
      chainId: 9527,
      mining: {
        auto: true,
        interval: 5000,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x6021ba41d6df4b515fb6013c5b3c4fac9c0b39cd3c44b657a3db6ec4321b71ea",
      ],
      chainId: 9527,
      timeout: 5000,
    },
    testnet: {
      url: "http://54.69.91.103:8545",
      accounts: [
        "0x6021ba41d6df4b515fb6013c5b3c4fac9c0b39cd3c44b657a3db6ec4321b71ea",
      ],
      chainId: 9527,
      timeout: 5000,
    },
  },
  mocha: {
    timeout: 5000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  abiExporter: {
    path: "./abi",
    runOnCompile: true,
    clear: true,
    spacing: 2,
  },
  gasReporter: {
    enabled: true,
    showMethodSig: true,
    maxMethodDiff: 10,
    gasPrice: 127,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
};

export default config;
