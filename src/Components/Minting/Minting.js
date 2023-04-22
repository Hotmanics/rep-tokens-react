import "./Minting.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
const Minting = (props)=> {
    const [toText, setToText] = useState('');
    const [amount, setAmount] = useState('');

    const handleOnToChanged = (event)=> {
        setToText(event.target.value);
    }

    const handleAmountChanged = (event)=> {
        setAmount(event.target.value);
    }
 
    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

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

    return <CenteredCard className="minting" title="Minting"> 
        <p>Distributor</p>
        <input type="text" onChange={handleOnToChanged}/>
        <p>Amount</p>
        <input type="number" onChange={handleAmountChanged}/>
        <div><button onClick={()=> { mint(toText, amount) }}>mint</button></div>
    </CenteredCard>
}

export default Minting;