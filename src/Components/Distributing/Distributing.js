import "./Distributing.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";

const Distributing = (props)=> {
    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
        props.connectedWalletInfo.provider
    );

    const distribute = async (from, to, amount)=> {
        try{
            let tx = await contract.distribute(from, to, amount, []);
            
            props.onBoastMessage("distributing tokens to " + to + "...");
            await tx.wait();
            props.onBoastMessage("distributed tokens to " + to + "!");
        } catch(e) {
            props.onBoastMessage(e.reason);
        }
    }

    const [toText, setToText] = useState('');
    const [amount, setAmount] = useState('');

    const handleOnToChanged = (event)=> {
        setToText(event.target.value);
    }

    const handleAmountChanged = (event)=> {
        setAmount(event.target.value);
    }

    return <CenteredCard className="distributing" title="Distributing"> 
        <p>Receiver</p>
        <input type="text" onChange={handleOnToChanged}/>
        <p>Amount</p>
        <input type="number" onChange={handleAmountChanged}/>
        <div><button onClick={()=> { distribute(props.connectedWalletInfo.account, toText, amount) }}>distribute</button></div>
    </CenteredCard>
}

export default Distributing;