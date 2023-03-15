// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import { abi } from "../../abi";
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const GeneralContractInfo = (props)=> {



    const [maxMintAmount, setMaxMintAmount] = useState(0);
    const [assets, setAssets] = useState('');

    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {
        if (props.onContractPageSet) {
          getAllHolders();  
        }
    }, [props.onContractPageSet]);

    const getMaxMintAmountPerTx = async ()=> {
        let x = await contract.maxMintAmountPerTx();
        setMaxMintAmount(x.toNumber());
    }

    const getAllHolders = async ()=> {

        console.log("got holders");
        const soulboundAssets = [];
            let soulboundOwners = await contract.getOwnersOfTokenID(0);

            for (let j = 0; j < soulboundOwners.length; j++) {
                let amount = await contract.balanceOf(soulboundOwners[j], 0);
                soulboundAssets.push({
                    owner: soulboundOwners[j],
                    amount: amount.toNumber()
                })
            }

        const redeemableAssets = [];
            let redeemableOwners = await contract.getOwnersOfTokenID(1);

            for (let j = 0; j < redeemableOwners.length; j++) {
                let amount = await contract.balanceOf(redeemableOwners[j], 1);
                redeemableAssets.push({
                    owner: redeemableOwners[j],
                    amount: amount.toNumber()
                })
            }

        const assets = {
            soulboundAssets: soulboundAssets,
            redeemableAssets: redeemableAssets
        }

        setAssets(assets);
    }

    getMaxMintAmountPerTx();

    // getAllHolders();

    // let output;
    // if (assets.soulboundAssets !== undefined) {
    //     output = assets.soulboundAssets.length === 0 ? <p>There are no assets!</p> : assets.soulboundAssets.map((data, index) => (
    //         <div key={Math.random()}>{data.owner} owns {data.amount}</div>
    //     ));
    // }

    if (assets.soulboundAssets === undefined) {
        return <CenteredCard title="Contract Info">
        <p>Max Mint Amount Per Tx: {maxMintAmount}</p>
        </CenteredCard>
    }


    return <CenteredCard title="Contract Info">
        <p>Max Mint Amount Per Tx: {maxMintAmount}</p>
        <p>Holders</p>
        <p>Soulbound Tokens</p>
        {
            assets.soulboundAssets.map((data, index) => (
                <div key={Math.random()}>{data.owner} owns {data.amount}</div>
            ))
        }
        <p>Redeemable Tokens</p>
        {
            assets.redeemableAssets.map((data, index) => (
                <div key={Math.random()}>{data.owner} owns {data.amount}</div>
            ))
        }
        </CenteredCard>
}

export default GeneralContractInfo;
