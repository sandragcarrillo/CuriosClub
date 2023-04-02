import { BigNumber } from "ethers";
import contractABI from "./Coffee.json"
import Router from "next/router";

const contractAddress = "0xc43072beD839F27C42a898167C56Ef271871FF07";

export function donationContract(kit: any) {
    return new kit.connection.web3.eth.Contract(contractABI.abi, contractAddress)
}
/*
   * Save the new feed to the blockchain
   */
export const createCreator = async (address: string | null | undefined, username: string,
    profilePixUrl: string, userBio: string, kit: any) => {
    try {
        const txHash = await donationContract(kit).methods.setCreatorDetail(
            username, profilePixUrl, userBio
        ).send({
            from: address,
        })
        console.log(txHash)
        Router.push("/")
    } catch (e) {
        console.log(e)
    }
}

export const sendTip = async (address: string | null | undefined, message: string, index: string | string[] | undefined, amount: BigNumber, kit: any) => {
    try {
        const txHash = await donationContract(kit).methods.sendTip(message, index).send({
            from: address,
            value: amount,
        })
        console.log(txHash)
        Router.push("/")
    } catch (e) {
        console.log(e)
    }
}

export const getCreators = async (kit: any) => {
    try {
        const creatorCount = await donationContract(kit).methods.getCreatorList().call()
        console.log(creatorCount)
        return creatorCount;
    } catch (e) {
        console.log(e)
    }
}

export const creatorWithdrawTip = async (address: string | null | undefined, index: string | string[] | undefined, amount: BigNumber, kit: any) => {
    try {
        const txHash = await donationContract(kit).methods.creatorWithdrawTip(index, amount).send({
            from: address,
        })
        console.log(txHash)
        Router.push("/Dashboard")
    } catch (e) {
        console.log(e)
    }
}