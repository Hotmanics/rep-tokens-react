// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";

const GeneralContractInfo = (props)=> {



    const [maxMintAmount, setMaxMintAmount] = useState(0);
    const [assets, setAssets] = useState({});

    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {
        if (props.onContractPageSet) {
          getAllHolders();  
        getMaxMintAmountPerTx();

        }
    }, [props.onContractPageSet]);

    const getMaxMintAmountPerTx = async ()=> {
        setIsLoadingMax(true);
        try {
            let x = await contract.maxMintAmountPerTx();
            setMaxMintAmount(x.toNumber());
            
        } catch (e) {

        }
        setIsLoadingMax(false);
    }

    const [isLoadingMax, setIsLoadingMax] = useState(false);
    const [isGettingLifetimeTokens, setIsGettingLifetimeTokens] = useState(false);
    const [isGettingRedeemableTokens, setIsGettingRedeemableTokens] = useState(false);
    const [lifetimeHolderCount, setLifetimeHolderCount] = useState(0);
    const [redeemableHolderCount, setRedeemableHolderCount] = useState(0);

    const getAllHolders = async ()=> {

        setIsGettingLifetimeTokens(true);
        const soulboundAssets = [];

        try {
            let soulboundOwners = await contract.getOwnersOfTokenID(0);
            console.log(soulboundOwners);

            setLifetimeHolderCount(soulboundOwners.length);
            
            for (let j = 0; j < soulboundOwners.length; j++) {
                let amount = await contract.balanceOf(soulboundOwners[j], 0);
                soulboundAssets.push({
                    owner: soulboundOwners[j],
                    amount: amount.toNumber()
                })
            }
        } catch (e) {
            if (e.method === "balanceOf(address,uint256)") {
                console.log("errored on " + e.method);
            }
        }
        setIsGettingLifetimeTokens(false);

        // assets.soulboundAssets = soulboundAssets;


        setIsGettingRedeemableTokens(true);
        const redeemableAssets = [];
        try {
            let redeemableOwners = await contract.getOwnersOfTokenID(1);
            console.log(redeemableOwners);
            setRedeemableHolderCount(redeemableOwners.length);

            for (let j = 0; j < redeemableOwners.length; j++) {
                let amount = await contract.balanceOf(redeemableOwners[j], 1);
                redeemableAssets.push({
                    owner: redeemableOwners[j],
                    amount: amount.toNumber()
                })
            }
        } catch (e) {
            if (e.method === "balanceOf(address,uint256)") {
                console.log("errored on " + e.method);
            }
        }
        setIsGettingRedeemableTokens(false);

        // assets.redeemableAssets = redeemableAssets;
        
        const assets = {
            soulboundAssets: soulboundAssets,
            redeemableAssets: redeemableAssets
        }


        setAssets(assets);
    }


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

    let lifetime;
    if (isGettingLifetimeTokens) {
        lifetime = <div><p>Loading Lifetime Token Owners...</p></div>
    } else {
        lifetime = <div><p>Lifetime Tokens</p>
        <p>Number Of Holders: {assets.soulboundAssets.length}</p>
        <p>------</p>
        {
            assets.soulboundAssets.map((data, index) => (
                <p key={Math.random()}>{data.owner} owns {data.amount}</p>
            ))
        }
        </div>
    }

    let redeemable;
    if (isGettingRedeemableTokens) {
        redeemable = <div>
            <p>Loading Redeemable Token Owners...</p>
        </div>
    } else {
        redeemable = <div>
            <p>Redeemable Tokens</p>
            <p>Number Of Holders: {assets.redeemableAssets.length}</p>
            <p>------</p>

            {
                assets.redeemableAssets.map((data, index) => (
                    <p key={Math.random()}>{data.owner} owns {data.amount}</p>
                ))
            }
        </div>
    }

    let maxMint;
    if (isLoadingMax) {
        maxMint = <div>
            <p>Loading Max Mint...</p>
        </div>
    } else {
        maxMint = <div>
            <p>Max Mint Amount Per Tx: {maxMintAmount}</p>
        </div>
    }

    return <CenteredCard title="Contract Info">
        <p>Contract Address: { address }</p>
        { maxMint }
        {/* <p>Max Mint Amount Per Tx: {maxMintAmount}</p> */}
        <p>-------------------------------------------</p>
        {
            lifetime
        }
        {
            redeemable
        }

        {/* <p>Lifetime Tokens</p>
        <p>------</p>
        {
            assets.soulboundAssets.map((data, index) => (
                <p key={Math.random()}>{data.owner} owns {data.amount}</p>
            ))
        }
        <p>Redeemable Tokens</p>
        <p>------</p>

        {
            assets.redeemableAssets.map((data, index) => (
                <p key={Math.random()}>{data.owner} owns {data.amount}</p>
            ))
        } */}
        </CenteredCard>
}

export default GeneralContractInfo;
