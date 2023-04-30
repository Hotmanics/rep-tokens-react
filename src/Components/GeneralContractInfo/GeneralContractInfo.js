// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
import "./GeneralContractInfo.css";

const GeneralContractInfo = (props)=> {
    useEffect(()=> {
        if (props.onContractPageSet) {
            test();
        }

        async function test() {
            await getAllHolders();  
            await getMaxMintAmountPerTx();
    
        }
    }, [props.onContractPageSet]);

    const [maxMintAmount, setMaxMintAmount] = useState();
    const [assets, setAssets] = useState({});

    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

    const getMaxMintAmountPerTx = async ()=> {
        try {
            let x = await contract.maxMintAmountPerTx();
            setMaxMintAmount(x.toNumber());
            
        } catch (e) {

        }
    }

    const getAllHolders = async ()=> {

        const soulboundAssets = [];

        try {
            let soulboundOwners = await contract.getOwnersOfTokenID(0);

            
            for (let j = 0; j < soulboundOwners.length; j++) {
                let amount = await contract.balanceOf(soulboundOwners[j], 0); //Sometimes errors out here. Sometimes does not error out.
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

        const redeemableAssets = [];
        try {
            let redeemableOwners = await contract.getOwnersOfTokenID(1);

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
        
        const assets = {
            soulboundAssets: soulboundAssets,
            redeemableAssets: redeemableAssets
        }


        setAssets(assets);
    }

    let lifetime = <div><p>Loading Lifetime Token Owners...</p></div>;

    if (assets.soulboundAssets !== undefined) {
        lifetime = <div>
            <h2>Lifetime Tokens</h2>
            <p>Number Of Holders: {assets.soulboundAssets.length}</p>
            {
                assets.soulboundAssets.map((data, index) => (
                    <p id="wrap" key={Math.random()}>{data.owner} owns {data.amount}</p>
                ))
            }
        </div>
    }

    let redeemable = <div><p>Loading Redeemable Token Owners...</p></div>;
    if (assets.redeemableAssets !== undefined) {
        redeemable = <div>
            <h2>Redeemable Tokens</h2>
            <p>Number Of Holders: {assets.redeemableAssets.length}</p>
            {
                assets.redeemableAssets.map((data, index) => (
                    <p id="wrap" key={Math.random()}>{data.owner} owns {data.amount}</p>
                ))
            }
        </div>
    }

    let maxMint = <div><p>Loading Max Mint...</p></div>;

    if (maxMintAmount !== undefined) {
        maxMint = <div>
            <p>Max Mint Amount Per Tx: {maxMintAmount}</p>
        </div>
    }

    return <div className="generalContractInfo" title="Contract Info">
        <h2>Contract Info</h2>
        <p id="wrap">Contract Address: { address }</p>
        { maxMint }
        <p>-------------------------------------------</p>
        {
            lifetime
        }
        <p>------</p>
        {
            redeemable
        }

        </div>
}

export default GeneralContractInfo;
