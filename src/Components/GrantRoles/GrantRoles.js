import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"
import React, { useState } from 'react';
import "./GrantRoles.css";
import { abi } from "../../abi";

const GrantRoles = (props)=> {

    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
        props.connectedWalletInfo.provider
    );

    const grantRole = async (roleInBytes)=> {
        try{
            let tx = await contract.roleGranter_DELETEFORMAINNET(roleInBytes);
            props.onBoastMessage("granting role " + roleInBytes + "...");
            await tx.wait();
            props.onBoastMessage("granted role " + roleInBytes + "!");
        } catch (e) {
            props.onBoastMessage(e.reason);
        }
    }

    const grantBurnerRole = async ()=> {
        await grantRole(await contract.BURNER_ROLE());
    }

    const grantDistributorRole = async ()=> {
        await grantRole(await contract.DISTRIBUTOR_ROLE());
    }

    const grantMinterRole = async ()=> {
        await grantRole(await contract.MINTER_ROLE());
    }

    const grantSoulboundTokenTransferer = async ()=> {
        await grantRole(await contract.SOULBOUND_TOKEN_TRANSFERER_ROLE());
    }

    const mint = async (to, amount)=> {
        try{
            let tx = await contract.mint(to, amount, []);
            
            props.onBoastMessage("minting tokens to " + to + "...");
            await tx.wait();
            props.onBoastMessage("minted tokens to " + to + "!");
        } catch(e) {
            props.onBoastMessage(e.reason);
        }
    }

    return <div className="grantMinterRole">
        <p>Role Granting</p>
        <div className ="buttons">

        <button onClick={grantMinterRole}>Minter</button>
        <button onClick={grantDistributorRole}>Distributor</button>
        <button onClick={grantBurnerRole}>Burner</button>
        <button onClick={grantSoulboundTokenTransferer}>Soulbound Token Transferer</button>
        <button onClick={()=> { mint(props.connectedWalletInfo.account, 50) }}>mint</button>
        </div>
        </div>
}

export default GrantRoles;