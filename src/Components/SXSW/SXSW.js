import "./SXSW.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
import { oneOffAddress, OneOffDistributorABI } from "../OneOffDistributorInfo";
const SXSW = (props)=> {

    const address = oneOffAddress;
    const contract = new ethers.Contract(
        address,
        OneOffDistributorABI,
        props.connectedWalletInfo.provider
    );

    const handleClaimClick = async ()=> {
        try{
            let tx = await contract.redeem();
            props.onBoastMessage("claiming tokens...");
            await tx.wait();
            props.onBoastMessage("claimed tokens!");
        } catch(e) {
            props.onBoastMessage(e.reason);
        }
    }

    return <CenteredCard className="minting" title="SXSW"> 
        <button onClick={handleClaimClick}>Claim Your Tokens!</button>
    </CenteredCard>
}

export default SXSW;