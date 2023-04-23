
import fs from "fs"
import { task, types } from 'hardhat/config';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from "ethers";
import { expect } from "chai";

task('mt', 'Mental Poker Test')
  .addOptionalParam('contr', 'contract address', "0x0000000000000000000000000000000000003000", types.string)
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
    const myContr = new ethers.Contract(args.contr, abi, provider)
  
  try {
    {
      //  first CanonicalDeserialize::serialize(), then base64()
      let params = Buffer.from("BAAAAAAAAAANAAAAAAAAADdOoK_LL0S7GvgLGt5OzoX1NMQAezHWY8VcLsDTbMgDDQAAAAAAAAAqhBEbeDCTw-bHFph0jwRLU7Hy6huwZJz7_ioY54pHgSq34enJVLMB6rE1E1UcH1ZScd-iHLznYuwBF1ZrY4ACcJN5OtMn7rwh3VIGa7DhOe9XL_U4pvXR54O70b5x8YTS0RQrdXz9QAo00SqmLnW22li_59pIdkHkBZJckWjuhBuK2zeHgBSAtRMrAW1-WIUq-HKU5zrp7J9gvkUUAYyH8yLwQSJgVOZGnnCApYy8m2YOKa8nhbN0-FkN13GoYwBRWfIL2DKwBl4ywZ_YoBxKpVnm1pV4GMmx1OJ1HoGOAOgIA1DemSFxIFwoC2UV41kadydvA_3jlqzH8GrzBVKAnjlR-lR9BUdKDH7n1otQaFAKDQDaFwd2u2_dWnhh0APhd66-NH-d61kWukgxM_PZHT3rSGOc9ub1CrXt7rBiAXDn2nyIYlzXkDKxkKwiiB1-5AruXfrf5MfKkREnaKyAPIzxxRbbVlifRLLZAiU9oC-W6A5aTOioe-pFk-eujoef_WPbBykuVcehxK5GESqgwhNe1x7TwmfgPlGvUxm5BiRxIKxPzyRbbwt83MSTMz2flcyr6TvF8m89QZedKgGHEsSE5ZlYsNDRoM_h62umi5pyDULexyhH6S3ASwChTIQ=", "base64")
      let pubKey = Buffer.from("axenhaB_O-HAn_QVtxrdOe-jZ2lpU26h5Z6rtqGOU4I=", "base64")
      let memo = Buffer.from("BQAAAAAAAABBbGljZQ==", "base64")
      let keyProof = Buffer.from("6m5rwpyrbXFC2prj6_0SuolxGhNg1VF-HbcoB39wygGbaXDO6qG4aJflgRIOKvgc-Uv9ElXEOVJqDXNERpCkAQ==", "base64")

      expect(await myContr.verifyKeyOwnership(params, pubKey, memo, keyProof)).to.eql(true)
    }

    {
      //  first CanonicalDeserialize::serialize(), then base64()
      let reveal_tokens = [
        Buffer.from("k-Rrh7gz6OOLyZBoISd05Es0MzNBRzxdBFNcvSD_QoE=", "base64"),
        Buffer.from("ugfY_nIOKnF1xYgDETySA9Xzg9guAt8cs4pCEBI1mwM=", "base64"),
        Buffer.from("jFP-AlCoroEFSJOtk3Nv5-wG_zUr8FQkKQqLCTJfOYE=", "base64"),
        Buffer.from("KDs0s9KJJwXuHQq4Gn6pI03V1sYW1UWNROM2JPfcPoU=", "base64"),
        Buffer.from("DsAqekRL0raN7ojjGRhPZTj_1TLb0gGpbwplzH4_1wc=", "base64"),
        Buffer.from("c_kVevpxavBOijZfM_iqKirwxAz4lkq0UO50051B4Qc=", "base64"),
        Buffer.from("rglnY3_jKKhIqNLYC-oYm1Yfm0NavKootchZ-qo2YIY=", "base64"),
        Buffer.from("lhrtKBYk6tfa1lgNK69jt7GREfIKdTI6NF7eNO2k-4M=", "base64"),
        Buffer.from("xRDJh6A9R3UvGzFIWBKWb9QeGHAc0hyBxWF8yRXGfAE=", "base64"),
        Buffer.from("MhEsYK0M12LZLoQgg-AgH13ObXZdTU3Qeuf4WH_LyQI=", "base64"),
      ]
      let masked = Buffer.from("gujc6aiJhN7cHG0O9v66PkFv3aRrvPTuIPHaGLKZpAc3ckTvZPpYOEFf-bltf696w_o8og4ymzU9wauW-aGmgQ==", "base64")

      // base64: Disb6x3_MHyp0QOehVVETDtCcB_jrcN3z80KT_KZkwM=
      expect(Buffer.from(await myContr.reveal(reveal_tokens, masked)).toString("binary")).to.eql("0x0e2b1beb1dff307ca9d1039e8555444c3b42701fe3adc377cfcd0a4ff2999303")
    }

    {
      //  first CanonicalDeserialize::serialize(), then base64()
      let params = Buffer.from("BAAAAAAAAAANAAAAAAAAAPpCzkaGNCW2GXPn0J1sOsPHfnMAO7Q1tzTExiW8g76ADQAAAAAAAAB-nfvRHQMNaUK02cKpoMzMx85543HX8yWhpFWLYUaPAgk_eXLvC7jt0HKZiU57h9dFRKvoYoc8C9PfC_LicP8A7XqC_jfyDGLQas-cjrMoB1miqaXBS3Aa9TRB3PiT0gNIY2suvDojdDx5mRfKKmo_Gy-dd4Bi6LDRe2UkGlTUgYZWOPDpHf7F6ttUawIOqSD4SvGvJbg1bOWUOGU-RfkG1i0RDQfQvyVLgIUGwVMpdfHgNrmLqLM9m7ZSd0VIoYKo36LfOlJbQphkd2SjUvgLLOz7pbeuYY2tYIjjEjnThDqaxf53L-Ab5dAnZ_EEG7E6Kvwd9pk9qWp15bBCtnEBcxujC_XJbcMuzt_Mr09e9GlRK_fY5WxJ78BBSgaWtwPx2xJBmK14FqcF3DAvQ3x9Ji-I8zMQE7I8X194lWgKBIYgk_JymlN8b898RO1_FsetDQOZ-oWY7k5l6TH2MbWGJiBhEeFS1R_pA_z0E7Yrevn0YrNsTdP6EsSeGLjSW4Hz5oMNq1JVaZxpIplI3WycnMrLmuFD5t7nbDJT26wPhaWl2s3HW_yuNsluBGoDrm6T6vtXX5w--2B_ri4rpKGAjGLrBUQVM5Dmt48w99dj0ZyfC8CLxYss731wuaZYwwA=", "base64");
      let shared_key = Buffer.from("0i_OgYsnOwPxnXjd0J4Vnw6C0u_KetQX88ggiAuiI4I=", "base64");
      let cur_decks = [
        Buffer.from("PQ4plo9TiSyy-NXJJxTMtw7-nD0I2Bs1X9Boba5ynoCn1LizDLbk9PsTBTyI5PcXhloJ1Vj8lS20B3v3bQaPgQ==", "base64"),
        Buffer.from("87wjTL8Ix-YzUCSrBWmfhRCinO81yIQgP3ZOnxOgqYaqWtBdkMLgZMNJVwQ_ChWcCx9G_oPRg_wmfj-9lYpDgQ==", "base64"),
        Buffer.from("Z1Zt75Px59VY6tp83bbWfQ_iGTUkszU5azg9iND1S4aa7IVjL4Lb_TegYtb81cDnRky9AsTzPvfm1YdDFE42gw==", "base64"),
        Buffer.from("f-NlEFXiDy5j3Q9MTsgz4WewMRy_OOJXE8VIflnTQoIc5gm4xawFaunhXBclCqwOkCtVRXjMFjSTtWnFSNVFBQ==", "base64"),
        Buffer.from("dcjuikd-wbU_b3iawbW2B8ixr51ZiyrYIgnTCV_SagToIT6MEhXFjEc9qok-ASgGUgj2DT8rbNUB0huim_UfBQ==", "base64"),
        Buffer.from("bF0t1SvI03PWNmJu7dHAjcQVakUShgWGgLD2mmW8ZwNTiVGEuwMxYlin0uaZMbayDErfBkBck2hbi03GpWQLBg==", "base64"),
        Buffer.from("aE2lLJQjX49bHHybZRwUay-b836-GXuf1V5jjZ14GwBGVZZrcO6TJlmGu3WUIjR1Q7i8QQ1nePlI7tXujUNxBA==", "base64"),
        Buffer.from("K6VgMkku9ysa8__NaoxlJOLWRj6Nfgsdw8mRUVYERgUrN54nbN84kgssq7VPxNY-yWLvTisOPYCLHhjLIkFsBQ==", "base64"),
        Buffer.from("buBv9i82ANb2ym4kaqFoi5qsi5OATeNeW0qlQZmL9IfPRLQAl_DBap1-FCqc-6OzdqtPkOsgpGhzbz5MjLewBg==", "base64"),
        Buffer.from("sPG3YpSNhMhZtvSE_pOynJo-Sxmb_YmEUkVDaUFSHYCFYKMrWWsErZ8LKoW7fuuR5KRKLjJWwpbxF8l9vKjVgw==", "base64"),
        Buffer.from("TWz9NqjXuybmfbKydQs-e1zTGImnir10DcbL3YHj2gGWGWiwoPr7G16GiDiGadcar2n1Q3YyQb_v1cmv-wvEAA==", "base64"),
        Buffer.from("2vFoGhENhhl4XIkOdl47XJDbO3PPYob7CRqmxI7eF4SIMpB2PvL3Gn-3nup6y2hiC7iqUgBONlLOwbKsRPLpBQ==", "base64"),
        Buffer.from("__rRVViQ0W2DY51vrcUiIFEdxME38tq6Mymejj-H5waY_ldIMUNTo9DBfGr6Idd9-MB-WJdrLPRaP3QpkMWsAw==", "base64"),
        Buffer.from("1p7lZRPL0KzUJnyHaf1fOcGnyzEYezL_LIDX0axA0QTBaPMlITSBKX_bRSRsGjwKgE565gI-PkP7q3pweAvbBw==", "base64"),
        Buffer.from("E0ebrvwvzhD3ok9eNITGEOpZdIMNTE_uEvttOgIVy4OzOfoPDdKERy88LSwXD8rzSMjyxI5zirlykFeXIreDAw==", "base64"),
        Buffer.from("jyEpQfjKH_44v35J7de2i1zgTKrtmXn26pl_elYdmgO5u91qf4-rW4WN789EbCb2CbjveyNELvMPij2KP0Z3hA==", "base64"),
        Buffer.from("5MGf1j94GSiqcT7BOqmifveI8o73EdDA4_R0LwOPlgD3PI3Q_BqA6kdNk1IVVvyaVycKD5HPlIQ9ByUJWeA5hQ==", "base64"),
        Buffer.from("T_49VN4DMjQ30rHfq8_p-HkQP-2PyT-Zy5QUGSRVD4Wjj8mATGjKlBj0guz7nDIULBkspBIM43LnSYDWrVUBAA==", "base64"),
        Buffer.from("R5J8XqItp_SoF4VHlu_GyviJ02wiDEkHt07DAlpXVwLdps6LKlnNIKHlwBRBW4zsdaV-ycDSh_OG082FjxeDhA==", "base64"),
        Buffer.from("UcqVhUHvyspqP62i96gRj4b3Zjy6wuRFctnxW3f-bwNY7Xej2UcYoi0g6h5WTMw0aquafs5Py2BulgVk-nPmhg==", "base64"),
        Buffer.from("-S1VP9ieOplPdYFHe8wBzqWsapiVzYWV9iRNhdXmigUEbAUA0NrgEC6dOJD6AET9nPzsfKT3hxfRcvvYttVohg==", "base64"),
        Buffer.from("6uDoWPlrOLKoT1p2_YwPqkDsMLVZIoVAuH59VMdJ4ofuOsIwcKIOPtjxjoI2lsbYwGYhKopVHM42AdsVHOJSgA==", "base64"),
        Buffer.from("pl59v81DdQjmA2mj-lUCBVp9iV3fWiQ2lbdB_syRz4brE21GZnYw2T0Vm31uI8v3YKgVkrdr9w6GB6t1yyK5gw==", "base64"),
        Buffer.from("bNMAQjIKOuhq_Gy_BET4zIB615EkxS_iRbjdj-YJvIUFNWEmLeSqfTUTI6-TXXaIQz7OZ3IoaLnxSGKInvPahg==", "base64"),
        Buffer.from("zdPWOXA3-AtE9yUg_s_a6pTtV6ThN26-JYfODrp44oKbBRxkuUgcaJSd6K32RQYFxDZvgtMLBLLuCNVZ1TDfAg==", "base64"),
        Buffer.from("LBxKQGkDRu4z9JtaElfJOElEpCLaUYEDr397J3DYWIRZatyMnchC_ObXZlqc7917OUr_CaVXBKruhpUMIvNjBw==", "base64"),
        Buffer.from("yUjRWXGWH_IgyGqpoyaYejPN0aGdQi3yPcPKnofsVwb2vHMG2VkeElf1DV2U5PtzsDnDsZgPpxeF0-WnWSt8hA==", "base64"),
        Buffer.from("qI_G4e2k5Pk4zvkC4kpgy-H9a_ggbi__taGQKZIobIRJDyjC5xzF6ZLyLCX1rirW82JwOGxQmzM2mLWxy05sgg==", "base64"),
        Buffer.from("XdR_CAXBryhs_VlURCOcHP2mrUjZNQq8Sbc662JEBYRJ1q7snVOiEUy5ibZWPlUMY8Z-K3nZhuG2tvpS5hOogA==", "base64"),
        Buffer.from("6TaDzDR6brWaBPYSeY1_bzd52mYPxKAbvYvWdjuefgDckT3gyABtzaKxyy-4vSIqaGVBnypzjQOZaiBq5xfnAg==", "base64"),
        Buffer.from("NUDpzrfRtpKoSkeQAIL52z6qDuVqJsIIZTMQbIoyK4EA4Da8sK1wtv0aFKgZf1wFYZAt5kKNc-WhkZqhmo-kgg==", "base64"),
        Buffer.from("o7L79m1ibH1BuBwohy2XOFwGrn7WcafJ6xNQJBc6MQP-1kyirmiCq1qKAZwQFhELxJA78yUk8ri07_HWpaIuAw==", "base64"),
        Buffer.from("_iRWSXmLG2b4xzyML_qCIokxZGm_hUu0zUaMlBNXPoC7Of2kf18Xdngv2amE2g10ogN_KdIcN-XsX1oHEbJngA==", "base64"),
        Buffer.from("Onvv3t67KTo1DKlXfBalv07SN0hcivTMFsP_jRMzXQeHaJRBJJ8QOQTe3Whw9SHXgFZOUPsMKFSnfm5Yf7lahw==", "base64"),
        Buffer.from("FXJpLzVhkHvdgtf9glIwEGSxNaQu-XwqRsh3SARXeADkcvYp85wsa5YcBAjXjy3MHj0vHASQNXvzwBnFCW2CBA==", "base64"),
        Buffer.from("6-Y9-HIs2Z5bKtb-2FUChhG4jqdfCeeTJiX7hctVAYMPBgKoQ3MeyegAnTLe3ZwNPO9m27GInB9cVqNw8v6hgg==", "base64"),
        Buffer.from("3EZTrNcHNmlH3kI4X8NH_ggGVFNcS8shMDFFjPI6uwQ4y87Q-ciVkQUdzkZrivAeCQkeLygQMxrLo21bbl7kAw==", "base64"),
        Buffer.from("xRoazhAEgL2YRpjQ9kfncvXAeQwleCPhT7b69b_c9wCMWYhqjphs1XwWSSPWMp28OAQWgz82rtGMI0fDpHtLAQ==", "base64"),
        Buffer.from("KKVdZIlOmgASmj13DemWg4vTGfPdg0MTr9nUrhhHz4WOdNTdvd0zPyLdGXWkz8uBh9Iw737mTu6HLJNrCVQYAg==", "base64"),
        Buffer.from("hUHhCzkDLdtsrOSYORBpP7yaR7zUhUSIngejXYgucwQL9GEtFAYJdvBiu5OuCd5sIrZqMDXMWnPp_wSdZPcbBg==", "base64"),
        Buffer.from("SqTghPxFuaAXXBKU5M7BPHUbfoeC408nHr62IAWz9QJuKhGTHa2HptoIG1LK0_E_v3-NPO0oRLnOClP_A-KOBw==", "base64"),
        Buffer.from("pzHJVN5NCjtoKGHS6kNJOFyrXRfTLA4YcCPLJ1yTYQWE3retgfQ72N2DITsyOziihGOxnCWVvO64yce47NVdgg==", "base64"),
        Buffer.from("-xsraAjalu9pS213W4Hm9YUZJbbcSCdsdVWxkZOegIFTbVxovRlIQsq-scFaILwheloSj6DV8j_c4XMkTH_FBQ==", "base64"),
        Buffer.from("44b_t_Yz6IYXj0jS-vCR_PZnwRrY1ARr8oPs6KPEToXVuXj1ioKnteQBbqX1P-LVdJGJgManTEMkF--rSdQBBg==", "base64"),
        Buffer.from("TRPxDfuz5QQapssA8vQgbFvUpYtRBtxq3yjkS1otBQd53STSI4f0mBSsbInpz_HSjAzilryk7TSrcfhvmOC2hA==", "base64"),
        Buffer.from("pSMJ_q_lTXmtWcV0FOA-Oh0EDn35mfGAiwv70Q-glIHkFdKqZ2MVyQ_Tk5nwMvD-2onjY_sOoz1zAfizi71nAQ==", "base64"),
        Buffer.from("xIkKNZ73j3zbLXe8Y0hEXDVUkYtf2LeegdNc0mvQuYK5DoOTjpoxceYTZ9fQNLCWKCBXJWLxuT1X0fWeZ871hA==", "base64"),
        Buffer.from("kIVkxrI-yTh_09krOigdWAt0vWeI1MbskAaTVTFBF4Lp1OgL0abtU2GBW7054F6IGNdTvsTK-SqjLSGax3NOAQ==", "base64"),
        Buffer.from("z5GtFqwrMY7J5XFMrDP0BlsNwi8--brCT3GU4CoWGwH70SDOKPVDIsJhzrmWwcwm2PeayFgG_bLnjJkvAF7hBg==", "base64"),
        Buffer.from("3NZoN859GNix4ErUh2pvAnVgUnbipd-p__B_PUMFLIFm5kvLtf6ZFpWWbfdNrBZp7GbmJ1paVZJKb8kKfdrXhw==", "base64"),
        Buffer.from("Er-G_FlHQyFk9ALbvWR2YtW6Fkig-zCy0qc2hYPWpIaYNOWbczETWomGl35bY93fXpF1JGU1LFwJ9KF34Yn2gw==", "base64"),
        Buffer.from("a4vNyYuxMYdAft_Vd49OM0kV5y2zvTKthKrd533GIoVvjo2CUNw5Tq-ceD-CnXPDpb-OaO85V-D_fJqvMJTmBQ==", "base64"),
      ];
      let new_decks = [
        Buffer.from("LilD56lyQFCqzxJrmvEqnsHmfXP7viOQH3DEzLB-DYONRn9sOi7WKL1ybJ0D4TGsQRuJM82JZhfRgadHh7ioAw==", "base64"),
        Buffer.from("Mr8wUjuuaW6w-M8Jn1IV3aZV-2kTRVH3F67tSoM5JgDK99EYIkk44DXmC-Ia6R2C_DbP7v8fyrT2BkNEiWxKgg==", "base64"),
        Buffer.from("F3Loe0E353nhiPcO_yTjXjCMWxrcOgGQSi-1MptJDQbm-qlJG055wYy5IKbXzBWyNuF7v97wYDHrmTmVHVTDBw==", "base64"),
        Buffer.from("dRP5wwCMZHGEUyePOoK4etwQo8VOiMe-daKtnvb1Q4P3N2xj93vyUPzXRtd7wzVQbdfwTR5xifkID8PTDFKAAQ==", "base64"),
        Buffer.from("iM8ZcYaQ2aDzqjxYsqTGSKgd4ECNc73ZtQjJ8EjI1YbLi9m-XHgKZyvMqjOAW9H2c-WcWWB1qGLkxwWKftpIhw==", "base64"),
        Buffer.from("R7Qso7LgJvvtRfXf7wHztgozUI9gBZF-gkEIn8SzXgHak-JfDNIZLucVHy-AjmjyPZcfjYskF5sWrCsEVi-bAg==", "base64"),
        Buffer.from("fcqLTGtVD-2XZu4tBQo9ZcYBF6Ebm4PM0c4Vl_ANBYEba_5Zrxg25BfLJBMZRcp_GwkbLL-nFphUggl0audMhg==", "base64"),
        Buffer.from("T3uFOsDewLcglcvmiPJBKdasbYOJVDTw_-Q0y3FAJoDujIPyKfUU7ddQOErll6NxYNTHmQnNTevJEr0vbLNOAQ==", "base64"),
        Buffer.from("7OLtA8he97krmR38uKeiRkxOc0hw6YG3FiHY91DHUQNz_6oXFWpc2Cwsf2EwEqEx2r0tiNg5b3FD8WqPr30tAg==", "base64"),
        Buffer.from("RcISUnT7p52UTi_pdmns3rsjObD9khUMXuft7WIKU4cjoIQNHkRHhb9u---LLmwf-IKTPGehKRmxijX2zpg3gw==", "base64"),
        Buffer.from("NSd7qajs5Su_4YQxVv3zEu2Zr7XkYZKKhASpW1-RcgW2_LppVYYeF42eoCTITgevl24p5tK8Tu8aeoF7ToKkhQ==", "base64"),
        Buffer.from("U2syy1Opuz72CkqeqOjv0fOgNP6oHJ5QwH8N2ejV54Tgsw9OzqeeV9oalyenBU2euc7RtbY_AUH2-cJ8v9ALAg==", "base64"),
        Buffer.from("ZMCbUKMHB4puXy5WUMhw0ZZ88aGzCS_kC974WS4w-gRvWXiKyokTkbuWsUle2_F3Ko29C2rgmeuMQ7Xs1Z60hw==", "base64"),
        Buffer.from("4KZU5RURsf8KqgPmD3bXMJPW_vd6DHcC4d88Wgx6O4G4quzr5a2d0s227EN2Tie-gj9kZHyUbr7sPI28MB_phg==", "base64"),
        Buffer.from("ILr-ZFbUhTaxiEVb_dalsnPE_Wk0vsZzWexQI5-12QGbjCGdmVAic_ZgOawQU7i2-Ptzzn_tzlAnOaN8jAl0gA==", "base64"),
        Buffer.from("OWzWfEDvscPdUy1emrLdCv4vXxzjHc0VQQXeRzpotwTJQCWtRCN26t7O2eeiRl_y7bIzq6_f_wncKUHQL3BlgQ==", "base64"),
        Buffer.from("tO0CxmvIRvnScGfI6Y9jKK2g6ZFN1jen7-TzTwNlUQSrmWmZoMymji249cc5R81elJJ8BHgbhaKgKBD2X9GpAw==", "base64"),
        Buffer.from("A_hZ4Av4ZaJpnv2HpJITl5-6lcYYwCOhDTKSFO99U4dZsdIO1yS6lBnBvlxvZDewKZUDu-CxoRfSgnxZe9KmgA==", "base64"),
        Buffer.from("fyC9kiSakcdGaMtNOHbh6OooIVi1P7CadYZJr6Rnd4YsmJnrZxp7Gr6rKzSvgkoLdxssvnCwGwKyMD2zuHn1hQ==", "base64"),
        Buffer.from("wVlClDe8kYrSTXMX-dgVYCWAyA2TpgTKHaWXdn49A4BYQudE0iqXt-8HFGuQW-FqSxE5ombJd5n66FCA_a0OBA==", "base64"),
        Buffer.from("D8PSv2NHaA6KFm9sUHxqIStbatVIlLlxAK4k-n0ysAMKDXQIHug3BL3gE-kOFADnTTBAZYAxJGDCEum6W9NDBA==", "base64"),
        Buffer.from("DFcHAGeZXjl9mpWnlXBNse3M-IEpD6KlBkxv1IfnuobJHZI7_u2eFLk1ryiNpPFyPsBm-Risq0EVc15l2wYEhg==", "base64"),
        Buffer.from("7BcnsSMWoWl3QAIrdotujv3oF8Pr3w-UXIOGrRMJrgIKnWLr4x6nmD_wDigZbyt3EHO44tljWV1fEMhUVbGmhg==", "base64"),
        Buffer.from("F1jv5yEN9bwXeC3zx4-Lv6mTYBO1PrD5yl5nmYkWlQKur8pJuM5Ys0__he4w7e1ojN0doEUr7Fe5Zpjr-pLJAQ==", "base64"),
        Buffer.from("hIbgygRXeg2J11TbUA_8Ttz3NxhY9YWJR7puWxEdjgL1HAnq1_U-w72DChPvlDgcIC9KAwrkBzISdaO2BF97AA==", "base64"),
        Buffer.from("LahCcKs_43nfHEhb3igaH2UG-IgImG9SV9cll8dnDQYaK6o2AqZhpLycK7D7ajwXU8EUy1TOuofKbM1DpeqYgg==", "base64"),
        Buffer.from("k_jxno34zNesbqcWy43KCdjEcPT2Z9o5ayfW4j7EqAJSStRL1w7sSdtEQytEKRpt6cAxTkWKd5_mAKpu5B9nAQ==", "base64"),
        Buffer.from("Lc40WM5rPfhhwji-gYL2dUPh2IibSlqrxnc1pvzOMgXaHBExkgS5zuNT3nxM4s5-OMdXMMDQHVQQOSn7QDwzgw==", "base64"),
        Buffer.from("1DmKarArufNMhw4dLpSNA9MoqibChP69OgkAP4E8A4OvDWsM9UPlF1UExaj7SrmfsBTSDKlPX0mVfnufarfhgg==", "base64"),
        Buffer.from("yJBzUg6oz6944RrJg-qsdRAS3aCzeefAHlVkagzJuIKrkvlQ8DkznfKGhZ8mtP5NnH3--LBwSNGSdbnSDUwvhA==", "base64"),
        Buffer.from("tZMFJWJMCVvY6LVhi06SWaqgDewMufHzHWheDeTwbQcV5yDXXG1CmchPfU1m4b2KFvg2uMj7XE6tacoXhFWmgg==", "base64"),
        Buffer.from("bpKOlBMb_8l7q2uSrnL8VW95frrF_JW1lwmQI00bHYO3lck4ov8Cawh1cPf2xDlfjbvjEx0hveuX85oDiMv1gQ==", "base64"),
        Buffer.from("J_x65afnP8aPMEMr0orSaZBnpTlWh5a2Ghhrsf9lZgCMR9hI_NIHOG6F1dezTKsh7DQeLU0XsCf5_W7wymXlgg==", "base64"),
        Buffer.from("1B3_9pBMOICdA5RwXkaAGNC61y7VPR-ts0QtgdJplIA7bcZqZS32P9WkTvUUoNinNWK8YYeaSDKGS5TqrzdwhQ==", "base64"),
        Buffer.from("WjqsFK8k3woxaN0Z52iXj8bDKWkKBSfc02DBBExXJAR_D5NlY_81_Ha3LUYkGor0bKpdwXhoPFI4plhYonQ5Aw==", "base64"),
        Buffer.from("SPAQ2FwiHOqFU6caYSsMzrSy3zeQXdeu5QgRl8w6gQT6KLsPP-SwBi8hq2APcP8kYWVNB1Y3ljjStbST7cuNgg==", "base64"),
        Buffer.from("Zv4eVTHHcUy__ghv8VFP6lyALH9B_klDrGT8cu1rHoT4l-Uc0HEl5uNM7qtIONBNnHwW7pqTPcFN1GRyK3x7BA==", "base64"),
        Buffer.from("tYR1i3fHRBpUjAyb9yrzTRGqaOBFQ4L0708FaNheDYZXweWw7MoCG0GSNmzHM4dB9lMOyg7dpucRroYV6Fs8gg==", "base64"),
        Buffer.from("4mpWCwRyccz73-tkNXgL2zLTgAkvWELkDwsIb4Ou5ICph1z3tLmL2TP0wXuEjTqPcjExrRfXAnsi_tuUnahLhg==", "base64"),
        Buffer.from("vBdyam1y8_KLPow6mK4GbksfFh-CjLdznfoxk1mAs4Z7tzAvmG4GC9EDeCjNY9-7ZkZ9IF4b1mjyqkqN9XH6hg==", "base64"),
        Buffer.from("op-dAyIGyjvGd8Rp-cLrk5M6kptgdRzHT3Gqpn4OywJbawXfv5c9mwnZzuzJ4LMoei9xW4b5G4tphY3DT4Tigw==", "base64"),
        Buffer.from("BMubw_K4wLt57UvkEcg4DK5v_HYx8wJ89nYbKeCemoYb20WWKJHAHm8Eoma8gFFFQf0Ub8-r0VrJbMnKJyCYAA==", "base64"),
        Buffer.from("HAt9yO5xr0RnauATvS9timcCmSBrcLYljyW1kSE1BIMeAE2skPK_cu7g0ctg7LqZaxu62qfE2eOYO5oszBFIBA==", "base64"),
        Buffer.from("2HkSa2imtVLvYd3aBUmLKv4g1GbhDZdDjWWIDXp52gBbwC_0Yeq6eLQ1cQ9YjpzCuoNNjGa4-dRRrAUhBDn1BQ==", "base64"),
        Buffer.from("YY5XUKWE7T3-uKSWQDXXZ6H9PZpTW76f66aS2uI3ygajjJyPRo41QG_Nap5c0YrjkW539Ky4x23Anh-tvxUkAw==", "base64"),
        Buffer.from("VdXOqKL1AW6HDcvzPjRvILcMNZpy1ljGy0D85ir4mwQAE6PD-JyLZ05A7fS01rkvO3zC50Cw2QAv0m-b4ZpJgg==", "base64"),
        Buffer.from("lQe-AlWTGiVjCgqJLT3Lo9iMIdawvvVksxvb1JCOGoCvpmGklwevYYGCKrkA4JpfmrG9MbIkI6-aRkL2w-yRhQ==", "base64"),
        Buffer.from("hkWSmeIX0EHWHq2_unS4ySU8qoJil9i37Ldq80gH5wUMHlE_hbHswz22_MB0NoOgnJUj1cQUHqu4cjmwvBJ6gQ==", "base64"),
        Buffer.from("4sC9w0da3jK1oe5gYaKkFTdxYgSYaa9ANN-ONpoyuoIfdtvEn1jREyI_QO1x85GE28_cZOmB7iqijwh2XO63hA==", "base64"),
        Buffer.from("Bfc8MO0Ye2_69I23QeoE-NMh68vboyV_pmaTFXIuEIOe4ZkOty0I1NkfX_NVGuWxxAihxGypVy312MWh7NNzhg==", "base64"),
        Buffer.from("d0DYrmt-SWoJVpGUwOicwMSCqo8GcNAKcXU9_93NSQOt13ZO0C1lgeWeQVsDjP3KEUFiV0mOj2J93rDGebN2BA==", "base64"),
        Buffer.from("G4i8cjO4q7OVWCAgfzi33-LutNW9AkpEqcil_5ozXIQtNiYFhchgOtukItqYztQQAPzCpxlnYm1LxlCXpT4WhQ==", "base64"),
      ];
      let shuffle_proof = Buffer.from("BAAAAAAAAACgNx41xpJZi1HZm6q-0eI0OiNNPF1DcI1XwVDLFkuohV6U29nipsIGY3A7dXEAbyoYv-zrTVfEEgGV5rSoZiIGjjNwe8kiZYxqUzU-VEuQTbTh4-akRMPXr4IiSlGQ1wQR-K8l6c0i9MEZq-WaBmXBE28Cip7wUS0p3N3xeWoAhQQAAAAAAAAATkvJiL1Od1__VxQ6131pont7gPEiuaBQajHKf4zzNADRXm6cPcGBWT_OiGa0dn2saxJ7dvv4YMuDaqYanaUogicbaN9CwRFOSu0NyleQRouB2OYcS9X1qbRCY5suEv6F7IPWRY0vYHDjrGTGMel4zsJvec8EodHQVF6tH1c3qgE7TGhII8TzOt57RPHqSi7dKBsvgVyKKGLpl8mGRqSBAAQAAAAAAAAAM2Mjnnf639-k0priWAitiIsv5uo4OEB8RzNYeVvvcobxIpw6ibhTbnjgstXTR0X5EonKTaA4xmuffcO-HG_1A0XmVgWTv67uk3Szffwiks7ZaJhrfeEetMGcFw0FW0MCO0xoSCPE8zree0Tx6kou3SgbL4Fciihi6ZfJhkakgQDfssZqHR3JxKoJa9SA_g_FfDBIJ7d5ArPqeZ7gy8nrh1T-cjHnghPhno5L-fwzr_0r2eQ7wT9qyTwb0s2Ju9cDCQAAAAAAAABXEYdxnmKRsYZr902oiiTu1Rl0ecwWitALiRP7UQQABabQBsEAcKVmgd22p_mgO9rYIMDzqGnp3baMLnGvh_KBdQCq3HfQGEi3XkU5xp37rpvIk4BYS_ZXcO0NUeDHbIa-q5wNuNn2hsjZUJ8B3uA0ayyebE1a5LDxcZyaiDh6hNu7nEEucdYrP1ic5ZVIugUi-psx6JbXc6aq1fcgPCCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEDpJ9ZWZWBCk3jR35HBNmp1RSS7F3Ipv4dabsiiOLs1hXc1SPoQspVKSB9Gryb6oH6tUrqZi4Q12ulyPhTDzrCFrMoquruZZbGlCD9Q4k4_KqltxiYsHhxrxO2WrgH5SgMNAAAAAAAAAMrRVJDWH_MPSfDeeuBm8nXiLloL7k8DJr6jdOld6EUDs0EeXBvgmWQAhAxskB3KHE6nrnxgZuzQA5rpEBgnPAaxQ8K9PG1iXodnNZC3dOd484WAjqaAXSpqwSquU3EWATA38P0u68VyJTEOzoHXY2k6YNQkS2eB-9YR7Va6648FEDSR56-RjmNYaAH_5CIppIkMTPbLP3YudxwRAd8VzwOqAnu6nz68tnG300Q2fsmAa98mdqMdhuiZMRVdiW2UBfgKR2ZSM10aEN1loSQ9D1F1AhhS290mwX5yLRaddXcGj1LosC_AsEYZXQJlqAkHbWLmwVbvVgRc3rO5oTqFOQGaQneHtSHTHCmzP3bn01GQNvZUOYMbhYSqnt1fntWSAtZgiQHvXJwAOL1udAcp7varExH84fHBGd1N6k6MaEcFPpVZtxWJvtdoEGdV4l-bZlBAOn4oFTlJ6igcj1jZMwYOzDWMkCSdReHGve7g2PykuoKW09mrkKFi-tQVbj3kABKbbUxw7fFm_6t29gBZKBd0gxy6vJZP9jC4MNtqHFwEDQAAAAAAAABGYyWFKy1rpfo2p-i9MtvLdKo2TcFE_XnTzyYCJ58KBvJ19q0M9Z_9TI6NMYNxwUxzWsjCnWKWBnw9532LiPwFz7MO7TtbCIp6rgN-MoamVnfrMSYzBbqPKRYLRj6g6gbAJz5SS6aIMQoGLtZzH2CKvyZPhVsJ07k43mjp5UxfA_xXUyDm9RMY1-n2DNNX9aG-Tc5CCANfj9FgcRsD_VUDZXs4O3HYBFbm7n5UoQRqzj2rZVcqbEvkRp55ttgH8AJ0puSqUovLkp73zm1HQqhgY2Ywzg9eK8qdSJy-2s0tBm3xIyUrUa2HINK0nnrsloZs8TkbO2ZU2Q3y_ZrZaioH2ZZpZyDOHS4T6en8UgURWGcxUfrOFMOunpeStfEf5Qf_Gf9jRsmlxtLugkFdBNEqBsYlaAq_QK7bmXqF8G1dA0mdZiSsfuRob1JFoKQVAAtc7-7ekrvCOTNkKOmbkPYB08stfQ9ahmkXhiYRmPzpcJ6fcmxOHp2Op1iDxIsodARmxHcKvWjeE2_C9L0i3IYjnX0kE5lB1PSukwAQcJgvBxe7_8rXX-CjVeVyC69b2EMWGd3eEg86waXDgqOyyJQHiF9Srb5-mgg4AoMLEvHQd_EDD6yiIVJIm_Kc_n85wAOhs9nXYS4jXqWTvBnOKFoI-6idGBWvWd0jefhKkfsqBNCFbDycoAHhAe8t75nDq-4jZP9c3J5BVAbRH_ZYh2SHXBaq8QyQGJYPZv1ZJAkt9x0LiH1MhXtuzl6X2xXdtIJZ5Sle4NfHgjeqebBNsDW3j-MLTssrEToYOvFsehoNAg0AAAAAAAAAbqBaVKrXXIAf8673KQhO7EnitjV2nQ9xtj1LRpziDARihwMCKOyqBB5BZ8vIsIXK5_KEnIt3T1P5m1LRi1spAXM6uUscLMsZmeRqRLAb_vLmBXAgmMAPB4NkPzZTJ-QBIQbqT2D3NQoTz62WGr5sF8dbW4TI6-zGjztcj5exfwN9RbOJZeZ-YykuvjXhTr5-V194HshJdzrxr4ATg7ITBDP0WWyDYebEJAmzV_v_xuVG94PUIT9T3uDm5yO8u3EDFk6MgTiY-RCJ2CMPsnpLmZWH8LLAjdJr9PldSHT4QQVAqdAFWAAa9_pJi044uDWE6QVWFLB7AuCHwMY00PLdBkMKHWdhiwI3JXmeO2__hZKwv93W63pPfw5K2LFe5qIEdhLCJqjXSImUYySeHhZ1DCRqXpAH1BU17E1OpkHjRgCy_PxAnlyoby8hv_vpKyGJ8uybNOR660jsGZanL5MjAx-bujpyNkQGmDFpQxUklxQMA2WGoKdef4JvT_812kQFK5mWWjsX3QraPaV14gLvb5grR_JzvifPQt3glVyQMQcNAAAAAAAAAG6gWlSq11yAH_Ou9ykITuxJ4rY1dp0PcbY9S0ac4gwEaQ_zi1wB6uVcK4-BL4zgGneT6JhpLSv2nheXLT7Q1AFpSvfYDnqZtlEdNEk9oRVDxFAGO5498f_c7KnpXPXLAH1hMYrobiBynF6WPk6L0Y2XXZO7YB8bIHQNcrdPSJUC3x7GmZ-2tOXLOWxk0rT3qWDXdrNpERR28A9K_EIfBAWgfBfBPDRsGKjprQ4fyZhOiHK_0NAa_6lstXGRNz2hBZ1u023NzJiFyJYJSLiQHmcWg0UnOG2nruQFROh3QTIHfNR0nxLdKL6wdieXehGfyT5XuDqj--eMJAG1XbA8MgW0Ttq4zmuI5C3eV14u1zngdBJQfp0MPUlmW1FwNE7mAuZHEjKTbUW-diqnWIVf_Q3503yiKVA5DsjvjrDwQJcF240rn6BFVcucuh82JF90s7KsFm8h1ur52BpuzvUI5wfah2a0Eyvr3zViUG5ybneq0ss8-GQJD6_8jF-YGSRuALEr8I9i6SVlo5w_iitRQtcLlIsKooLOn78d6cP7Iw8DZEg0ZhhAvzjEJXEemzn6X9AwxHDT4C8tTd9z2yyrKwICiojRW7pty6gzmZZpq89uuCRwk_OwQex0QoedhnqXBnB8gxRFZXHdUC6AAIFtkaBkF7ZOGE5uARf4zY4o-B4HCAAAAAAAAACzpv1nI2KEDITK-CJ9RZA25rwm0ItkO4cO4Zp4Y8kUgdG6biNQ8niEPfdJszp-vcgUhmBUs_TkEo36FiAxK5cHvEtxw728PqIMnWFkao3ou8NN5jK9xob1FPBnz8hJfIUOeSaq0KiAiTDxr03ogB9cEu_HkNm-AtLB22EXlMpkgwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA-ahZaiZPaYU2iPIUCJcjxi8CXplmtJBXyRhKt_KsiARWMd5aHTUfQm3OF48tJ_FKgOqulHVWDb6w-K2VwE-Hh_ULQBvnI5hX4GWuZXXCnebAs50ePNSlSsldJyHXw_kCCAAAAAAAAAAsjrnj_S_QvNd4UVuZKtCqOWlC3DhGWT9XUdIOuShGgj9-2jZMHcwfen_pEVbOdu0aoxjntXokjzBmDbZUkToHbJgf-whRvOEO--nrfBg6KOlWnRTNfer8QSSQzItomoUF1zELe5fYuGtWhiC_o-Sxz9fpM74gRreXgnzVAX9kAQzP6WpVZ2W4jQZZgz2jQmFCfxPxg28QtDLDZ6on8keAxPfy67PjgEB16AXHPrAL3F12WS1qBMK-MYXI3IVSnQXB2zmwlrqoW4S2QS3STlcoacUalww8o3fuokcOwzKiAWsHE1-XVNTemFEHMNxpqvZuGJ5FpNDjxYLrqTKjrTEHydJUFRXA85G8z-MLPbco3CrI9j20icKIt_lgpv6o1QCff_bbW0E5F9QZ6UDVbolP61L6UiSMWg7Y0YVjtbIshIQw7C-5ptwQ3dFe_YXeGSCNY23Q7mmNBzQnqJZHqA6EAWSpr5dvAt4YdteVWOQE2yMnJWmVTJUoL-oi5qMPvQQxaxdPz7iK986nDfad7Ldf-BPlNWIQgMdokQzSyLw8BoWD3JgP3XZIKXQ5x7QGEE_lAIX2kqXavPKbNOCUA9gBJzN7x6eJ6G5JByqDD1vK6gQIDVZukaEZbajZjm6s1AJJM2mh6BlyhrePHmwUEljdEuSYZkk2LvCekXVkPkL5gcy3DxsubOQRZ-ufV_mX91ictKJOAqnWZeFWOknU2xoFxH1rlP8Dbep7IETl9f-1Btzt1gq9SbZhk5XkmSC75AWFJqmrhx4CjxBXQFihCgb4PIhqGpdxPncvmNgQg88YB_mTELQsADYqQZNyb3IHg2Gfba7kTjolze6YdmsG5TsDDQAAAAAAAACoy8EvXoGzUyWtQSWoMxxRGhuYxtxxsG1gxkZcCLXlBjVlzNf74Cj3X3g6ELI0YSrhZO9kvVHZHvHLo3BZ6ycENaQzzvq02b8k1pj-lwLg_Huiqh5REbqslG4zqEiXJgarrJJ9jJH4tMDJSNK1T_Gcc0u01S0MO2SR8Xzh-n0TBjnnHLaANoiU2-1T_dVNzMVKENChp9bk0ob5PuyRoF0A7lzrDSsl_X6ChOLtu4Bb9CvOz-F8lJwsTkQbKDIvlQCpaFe3sDTt4gXlpFWoLkcG1rKdS5W1Y4BENVXsBDIyBWzMM659W-OPVNfY0s3hIiXGA8Rc4lGz0mQFAWoJHvIG14SejTj6xQ4Kk3VAv3E9aeB-ptT5l7ZFVrty3WAVbwS-JI8D96JBzKDG_hyqUIjG5Epf-E5sbgsBIceM4O8CArt-vhpHwrGfv26WaRHnORuE86CMHxW4_9208oL0CTUA0qoNAO6ProNjzHtpGDcfIJSQRM_dNs8Q1RMwqj_v_AdSHDx0CDi2H2e4Dr5uZxvvyatpVcg9kzPJRR9KdO95Aw==", "base64");
    
      expect(await myContr.verifyShuffle(
        params,
        shared_key,
        cur_decks,
        new_decks,
        shuffle_proof),
      ).to.eql(true)
    }
    
    {
      //  first CanonicalDeserialize::serialize(), then base64()
      let pub_keys = [
        Buffer.from("dp04RMXTeIJxPBBgIVoEXZwVcXMcKpKtnIe9ooplKgI=", "base64"),
        Buffer.from("OtX2G7TmivVOvUlAZqh5EJjVFNlQ204rUm1f3q1Cv4E=", "base64"),
        Buffer.from("oZOR5Aw4PJIa20AfltE4DzujwBfrPztnn0XW72xxhgY=", "base64"),
        Buffer.from("Atty8Ay6T4mLhdVcpd8iPfeVaKw-hKqtn71X6SLRYYE=", "base64"),
        Buffer.from("n3tzDFA4GDo1EYsfk0s8c_YIJWN8bdZMyWk7d8rE8AI=", "base64"),
        Buffer.from("cnyzeCVLW22NegIABOACcJ_q0PaDwif_Ekd_l-AQswc=", "base64"),
        Buffer.from("4XFUPKhM7MedDroQaeXxuA9ui5Ikuz7GBVpyHnjwGAc=", "base64"),
        Buffer.from("5E4DS82p5PvS65zZBF_2vtgMtlA8jNTf3xmM2He4PIU=", "base64"),
        Buffer.from("Nnhu_25NYh6pSRZ7sz0kF6CysAsOZSRF13d5xCf7SIU=", "base64"),
        Buffer.from("WjQZygvCLLhCECjUsxnmEk3yIIaNVnjJmt11jfSdjwc=", "base64"),
      ]
      
      expect(Buffer.from(await myContr.computeAggregateKey(pub_keys)).toString("binary")).to.eql("0xc6a3ec77c09b497a5a0704fba6028b1f26e1827d3bf485383d868900cf480502")
    }





    // {
    //   //  first CanonicalDeserialize::serialize(), then base64()
    //   let params = Buffer.from("", "base64")
    //   let pub_key = Buffer.from("", "base64")
    //   let reveal_token = Buffer.from("", "base64")
    //   let masked = Buffer.from("", "base64")
    //   let reveal_proof = Buffer.from("", "base64")

    //   expect(await myContr.verifyReveal(params, pub_key, reveal_token, masked, reveal_proof)
    //   ).to.eql(true)
    // }


    // {
      //   //  first CanonicalDeserialize::serialize(), then base64()
      //   let params = Buffer.from("", "base64")
      //   let shared_key = Buffer.from("", "base64")
      //   let encoded = Buffer.from("", "base64")
    
      //   console.log(ethers.utils.toUtf8String(await myContr.mask(
      //    ethers.utils.toUtf8Bytes(params),
      //    ethers.utils.toUtf8Bytes(shared_key),
      //    ethers.utils.toUtf8Bytes(shared_key),
      //  )))
    // }

    } catch(err) {
      console.log("error: ", err)
    }
}



