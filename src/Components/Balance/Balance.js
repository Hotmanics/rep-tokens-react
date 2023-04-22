import "./Balance.css";
import { ethers } from "ethers"
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import React, {useEffect, useState} from 'react';
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";

const Balance = (props)=> {

    useEffect(()=> {
        getBalance();
    }, []);

    const [soulboundBalance, setSoulboundBalance] = useState(0);
    const [redeemableBalance, setRedeemableBalance] = useState(0);

    const [soulboundName, setSoulboundName] = useState('');
    const [soulboundDescription, setSoulboundDescription] = useState('');
    const [soulboundImage, setSoulboundImage] = useState('');

    const [redeemableImage, setRedeemableImage] = useState('');
    const [redeemableName, setRedeemableName] = useState('');
    const [redeemableDescription, setRedeemableDescription] = useState('');

    const [destinationWallet, setDestinationWallet] = useState('');

    const [toText, setToText] = useState('');

    const [isLoadingBalance, setIsLoadingBalance] = useState(false);

    const handleOnToChanged = (event)=> {
        setToText(event.target.value);
    }

    const address = repTokenAddress;

    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

    const getBalance = async ()=> {

        setIsLoadingBalance(true);

        let balanceOf0 = await contract.balanceOf(props.connectedWalletInfo.account, 0);
        let balanceOf1 = await contract.balanceOf(props.connectedWalletInfo.account, 1);

        setSoulboundBalance(balanceOf0.toNumber());
        setRedeemableBalance(balanceOf1.toNumber());

        setIsLoadingBalance(false);

        let soulboundURI = await contract.uri(0);
        soulboundURI = soulboundURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        let soulboundJson = await getJson(soulboundURI);

        setSoulboundName(soulboundJson.name);
        setSoulboundDescription(soulboundJson.description);
        soulboundJson.image = soulboundJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        setSoulboundImage(soulboundJson.image);

        let redeemableURI = await contract.uri(1);
        redeemableURI = redeemableURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        let redeemableJson = await getJson(redeemableURI);

        setRedeemableName(redeemableJson.name);
        setRedeemableDescription(redeemableJson.description);
        redeemableJson.image = redeemableJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        setRedeemableImage(redeemableJson.image);

        let destinationWallet = await contract.destinationWallets(props.connectedWalletInfo.account);
        
        if ("0x0000000000000000000000000000000000000000" === destinationWallet) {
            setDestinationWallet("The Destination Wallet is the same as the currently connected wallet");
        }
        else {
            setDestinationWallet(destinationWallet);
        }
    }

    const setUserDestination = async ()=> {
        try{
            let tx = await contract.setDestinationWallet(toText);
            
            props.onBoastMessage("setting destination wallet to " + toText + "...");
            await tx.wait();
            props.onBoastMessage("set destination wallet to " + toText + "!");
        } catch(e) {
            props.onBoastMessage(e.reason);
        }

        setDestinationWallet(toText);
    }

    const getJson = async(uri)=> {
        try {
            let response = await fetch(uri);
            let responseJson = await response.json();
            return responseJson;
        } catch(error) {
            console.error(error);
        }
    }



    return <CenteredCard className="Balance" title="Account">
        <div className="token tray">
            <p>{soulboundBalance}</p>
            <img src={soulboundImage}></img>
            <p className="titleBox">{soulboundName}</p>
            <p className="descriptionBox">{soulboundDescription}</p>
        </div>
        <div className="token tray">
            
            <p>{redeemableBalance}</p>
            <img src={redeemableImage}></img>
            <p className="titleBox">{redeemableName}</p>
            <p className="descriptionBox">{redeemableDescription}</p>
        </div>

        <div>
            <p>Current Destination Wallet</p>
            <p>{destinationWallet}</p>

            <p>New Destination Wallet</p>
            <input type="text" onChange={handleOnToChanged}/>
            <div>
            <button onClick={setUserDestination}>Set</button>
            </div>
        </div>
    </CenteredCard>
}

export default Balance;