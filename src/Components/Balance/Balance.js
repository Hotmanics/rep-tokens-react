import "./Balance.css";
import { ethers } from "ethers"
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import React, {useState} from 'react';
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";

const Balance = (props)=> {

    const [soulboundBalance, setSoulboundBalance] = useState(0);
    const [redeemableBalance, setRedeemableBalance] = useState(0);

    const [soulboundName, setSoulboundName] = useState('');
    const [redeemableName, setRedeemableName] = useState('');

    const [soulboundImage, setSoulboundImage] = useState('');
    const [redeemableImage, setRedeemableImage] = useState('');

    const [destinationWallet, setDestinationWallet] = useState('');

    const [toText, setToText] = useState('');

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

        setRedeemableBalance((await contract.balanceOf(props.connectedWalletInfo.account, 0)).toNumber());
        setSoulboundBalance((await contract.balanceOf(props.connectedWalletInfo.account, 1)).toNumber());

        let soulboundURI = await contract.uri(0);
        soulboundURI = soulboundURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        let soulboundJson = await getJson(soulboundURI);
        setSoulboundName(soulboundJson.name);
        soulboundJson.image = soulboundJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        setSoulboundImage(soulboundJson.image);

        let redeemableURI = await contract.uri(1);
        redeemableURI = redeemableURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        let redeemableJson = await getJson(redeemableURI);
        setRedeemableName(redeemableJson.name);
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

    getBalance();

    return <CenteredCard className="Balance" title="Account">
        <div className="token">
            <p>{soulboundName}</p>
            <p>{soulboundBalance}</p>
            <img src={soulboundImage}></img>
        </div>
        <div className="token">
            <p>{redeemableName}</p>
            <p>{redeemableBalance}</p>
            <img src={redeemableImage}></img>
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