import "./SXSW.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
import { oneOffAddress, OneOffDistributorABI } from "../OneOffDistributorInfo";
import { GSNConfig, GsnEvent, RelayProvider, environments, validateRelayUrl } from '@opengsn/provider'

const SXSW = (props)=> {

    let tokenBurnAmount = 10;

    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

    const handleClaimClick = async ()=> {

        const gsnConfig = {
            paymasterAddress: "0x47cC6a6F490dA8E2370db24CC63E18724FB5107A",
          }

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const gsnProvider = RelayProvider.newProvider({ provider: window.ethereum, config: gsnConfig })
          await gsnProvider.init()
          const provider2 = new ethers.providers.Web3Provider(gsnProvider)
          const signer = provider2.getSigner()
          const aContract = new ethers.Contract(address, repTokensABI, signer);
          console.log(aContract);
          props.onBoastMessage("Burning for beer!");

          //       address from,
        // address to,
        // uint256 id,
        // uint256 amount,
        // bytes memory data
          let tx = await aContract.safeTransferFrom(props.connectedWalletInfo.account, "0x4D6Ed22Ed0850384622EF129932aE29D27a89eD3", 1, tokenBurnAmount, []);
          await tx.wait();
          props.onBoastMessage("Burned for beer!");

          return;

          console.log(provider);


          new ethers.providers.getDefaultProvider()
        const myNewProvider = new ethers.providers.Web3Provider(props.connectedWalletInfo.provider);
        // const gsnProvider = RelayProvider.newProvider({ provider: props.connectedWalletInfo.provider, config: gsnConfig })
        return;
        // await gsnProvider.init()
        // const provider2 = new ethers.providers.Web3Provider(gsnProvider)
        // const signer = provider2.getSigner()
        // const aContract = new ethers.Contract(address, OneOffDistributorABI, signer);

        // let tx = await aContract.redeem();
        // await tx.wait();
        // console.log("Redeemed!");
        // return;

        try{
            let tx = await contract.redeem();
            props.onBoastMessage("claiming tokens...");
            await tx.wait();
            props.onBoastMessage("claimed tokens!");
        } catch(e) {
            console.log(e);
            props.onBoastMessage(e.reason);
        }
    }

    return <CenteredCard className="minting" title="Burn For Beer - Consensys"> 
        <button onClick={handleClaimClick}>Burn {tokenBurnAmount} </button>
    </CenteredCard>
}

export default SXSW;