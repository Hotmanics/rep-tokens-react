import "./Balance.css";
import { ethers } from "ethers"
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { abi } from "../../abi";
import React, {useState} from 'react';

const Balance = (props)=> {

    const [soulboundBalance, setSoulboundBalance] = useState(0);
    const [redeemableBalance, setRedeemableBalance] = useState(0);

    const [soulboundName, setSoulboundName] = useState('');
    const [redeemableName, setRedeemableName] = useState('');

    const [soulboundImage, setSoulboundImage] = useState('');
    const [redeemableImage, setRedeemableImage] = useState('');

    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
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

    return <CenteredCard className="Balance" title="Balance">
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
    </CenteredCard>
}

export default Balance;