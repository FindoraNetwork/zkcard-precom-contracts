
import config from "../hardhat.config"
import fs from "fs"
import { OnEvent } from "../typechain-types/common"
import sleep from "sleep-promise"
import { task, types } from 'hardhat/config';
import type { HardhatRuntimeEnvironment, Libraries } from 'hardhat/types';
import { ethers } from "ethers";

task('mt', 'Mental Poker Test')
  .addOptionalParam('contr', 'contract address', undefined, types.string)
  .setAction(pctest)


const abipath = "./abi/contracts/MentalPokerTest.sol/MentalPokerTest.json"
var url: string
var abi: string
if (fs.existsSync(abipath)) {
  abi = JSON.parse(fs.readFileSync(abipath).toString())
}


async function pctest(
  args: { contr: string },
  hre: HardhatRuntimeEnvironment
) {   
    url = hre.userConfig.networks![hre.network.name].url!

    console.log("HTTP URL: ", url)
    
    const provider = new ethers.providers.JsonRpcProvider(url)
    const myContr = new ethers.Contract("0x0000000000000000000000000000000000003000", abi, provider)
  
  try {      
    // console.log(ethers.utils.toUtf8String(await myContr.test(
    //     ethers.utils.toUtf8Bytes("call test1"),
    //     [
    //       ethers.utils.toUtf8Bytes("call test12"),
    //       ethers.utils.toUtf8Bytes("call test123")
    //     ],
    //   )))


    //  first CanonicalDeserialize::serialize(), then base64()
    let params = Buffer.from("BAAAAAAAAAANAAAAAAAAAGamO9qBpNfwGMjRFyV5UxkxNwwUQxg2MUid9NiNJqGEDQAAAAAAAAA9b9muLPCWVBEReeeLXUaaB5Xjk0CnxVaeoKYLAHhNgSCkUCRlZVFu2vLdGb7JoK2RC7KqYjLVcGcU6m9uaAKCFkHUPglPYiWyAaEGfVm3wN8h4va9scirw0g5EaFNE4NIK5K7W7SWXG-KCuwNGGhb9mHPEWcxKKN54_vZlq45AnILME7jk6ebN46jYVgo8M7HrGD9ZdfXZZMx1m4KS4iDNp9hwAwNqw0UHYu0dZeyRyXdG1t6liESP_A1xe9MbQasqqsbo1rtexGU5WzB9CxyU2fgfDphLsbu2FkAEfjvAmcWrwZEClq_d9zFKP-3WehR_0vxznNfk5QvkbWleWqEJJDjxwszVgJfjyflpve8WDRDP7YsWvJhHbLn3-SvfgRUcvgCnx5w5pNeU4GhzQ1b0NaF1tbkMIJvLxU_RPd0gZ3Db4ODJh1u5crtdcttvWi75Tij3YhfousGuhX41q6BLhtCbdaUasF0kX8RLQHwmX8bCSQ4YCOf8MsVBU8DwgRxBmr_oMAuz285lLUrY-MwAJMewnGcitsk-x94PU6NAF9KgIcXjQgBBiEUCsAEhtgcDY-JajQe0hA6R7ng3R2EUx1WtbwXAZUq2UzkDtvnomDgdaNcc121w7LDWx_2tQc=", "base64")
    let pubKey = Buffer.from("E8WqWlAVp-ku90Hyd0PyFbt8csTIT8-2eBLE5_cK1oQ=", "base64")
    let memo = Buffer.from("BQAAAAAAAABBbGljZQ==", "base64")
    let keyProof = Buffer.from("3_l6NJDrygA-zaI51VdcrzAEIqqqoPpoZkDbq30H2gFAtCQfW7tIiqny9Qe5td3ozX67xG6-MdbfbdXzTuwgAw==", "base64")

    console.log(await myContr.verifyKeyOwnership(params, pubKey, memo, keyProof))
      
    //   console.log(await myContr.verifyReveal(
    //     ethers.utils.toUtf8Bytes("call reveal1"),
    //     ethers.utils.toUtf8Bytes("call reveal12"),
    //     ethers.utils.toUtf8Bytes("call reveal123"),
    //     ethers.utils.toUtf8Bytes("call reveal1234"),
    //     ethers.utils.toUtf8Bytes("call reveal12345")
    //   ))

    // console.log(await myContr.verifyShuffle(
    //   ethers.utils.toUtf8Bytes("call verifyShuffle1"),
    //   ethers.utils.toUtf8Bytes("call verifyShuffle12"),
    //   [
    //     ethers.utils.toUtf8Bytes("call verifyShuffle123"),
    //     ethers.utils.toUtf8Bytes("call verifyShuffle1234"),
    //     ethers.utils.toUtf8Bytes("call verifyShuffle12345"),
    //   ],
    //   [
    //     ethers.utils.toUtf8Bytes("call verifyShuffle123456"),
    //     ethers.utils.toUtf8Bytes("call verifyShuffle1234567"),
    //     ethers.utils.toUtf8Bytes("call verifyShuffle12345678"),
    //     ethers.utils.toUtf8Bytes("call verifyShuffle123456789"),
    //   ],
    //   ethers.utils.toUtf8Bytes("call verifyShuffle1234567890"),
    // ))
       
    // console.log(ethers.utils.toUtf8String(await myContr.computeAggregateKey([
    //     ethers.utils.toUtf8Bytes("call computeAggregateKey1"),
    //     ethers.utils.toUtf8Bytes("call computeAggregateKey12"),
    //     ethers.utils.toUtf8Bytes("call computeAggregateKey123"),
    // ])))
    
    // console.log(ethers.utils.toUtf8String(await myContr.reveal(
    //     [
    //       ethers.utils.toUtf8Bytes("call reveal1"),
    //       ethers.utils.toUtf8Bytes("call reveal12"),
    //       ethers.utils.toUtf8Bytes("call reveal123"),
    //     ],
    //     ethers.utils.toUtf8Bytes("call reveal1234"),
    // )))

    // console.log(ethers.utils.toUtf8String(await myContr.mask(
    //   ethers.utils.toUtf8Bytes("call mask1"),
    //   ethers.utils.toUtf8Bytes("call mask12"),
    //   ethers.utils.toUtf8Bytes("call mask123"),
    // )))

    } catch(err) {
      console.log("error: ", err)
    }
}



