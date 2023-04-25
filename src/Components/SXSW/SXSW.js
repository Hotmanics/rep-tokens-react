import "./SXSW.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
import { oneOffAddress, OneOffDistributorABI } from "../OneOffDistributorInfo";
import { RelayProvider } from '@opengsn/provider'

const SXSW = (props)=> {

    let tokenBurnAmount = 1;
    let tokenClaimAmount = 40;

    // const repTokensContract = new ethers.Contract(
    //     repTokenAddress,
    //     repTokensABI,
    //     props.connectedWalletInfo.provider
    // );

    const claimBeersGasless = async (contractAddress, contractABI, paymasterAddress) => {
        const gsnConfig = {
            paymasterAddress: paymasterAddress,
          }

          console.log(contractAddress);
          console.log(paymasterAddress);

          const gsnProvider = RelayProvider.newProvider({ provider: window.ethereum, config: gsnConfig })
          await gsnProvider.init()
          const provider2 = new ethers.providers.Web3Provider(gsnProvider)
          const signer = provider2.getSigner()
          const aContract = new ethers.Contract(contractAddress, contractABI, signer);
          props.onBoastMessage("Burning for beer...");
          let tx = await aContract.safeTransferFrom(props.connectedWalletInfo.account, "0x38456fae75e2be6b071541942dd9c8750fF9Ebb2", 1, tokenBurnAmount, []);
          await tx.wait();
          props.onBoastMessage("Burned for beer!");
    }

    const distributeOneOffTokensGasless = async (contractAddress, contractABI, paymasterAddress)=> {

        console.log(contractAddress);
        console.log(tokenClaimAmount);

        const gsnConfig = {
            paymasterAddress: paymasterAddress,
          }

        const gsnProvider = RelayProvider.newProvider({ provider: window.ethereum, config: gsnConfig })
        await gsnProvider.init()
        const provider2 = new ethers.providers.Web3Provider(gsnProvider)
        const signer = provider2.getSigner()
        const aContract = new ethers.Contract(contractAddress, contractABI, signer);
        try {
            props.onBoastMessage("Claiming Tokens...");
            let tx = await aContract.redeem(tokenClaimAmount);
            await tx.wait();
            props.onBoastMessage("Claimed Tokens!");
        } catch (e) {
            props.onBoastMessage(e.reason);
        }
    }

    const distribute = async ()=> {
        await distributeOneOffTokensGasless(oneOffAddress, OneOffDistributorABI, '0xba8021c8c6219eaac87883e062fB456f537089C5');
    }

    const claimbeer = async ()=> {
        await claimBeersGasless(repTokenAddress, repTokensABI, '0xBA7D9bE288c3A36cC0d21ae1Ce2b341717994dc8');
    }

    return <CenteredCard className="minting" title="Consensys"> 
    <div>
        <p>Thank you for attending the ATX DAO's social mixer! Please click the button below to claim your Rep Tokens!</p>
        <button onClick={distribute}>Claim {tokenClaimAmount} Token(s) </button>
    </div>
    <div>
    <p>Thirsty? Redeem { tokenBurnAmount } token(s) and find Jacob Homanics to receive a free beer!</p>
    <button onClick={claimbeer}>Burn {tokenBurnAmount} Redeemable Token(s) </button>

    </div>
    </CenteredCard>
}

export default SXSW;