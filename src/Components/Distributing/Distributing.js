import "./Distributing.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import { abi } from "../../abi";
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const Distributing = (props)=> {
    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
        props.connectedWalletInfo.provider
    );

    const distribute = async (from, to, amount)=> {
        try{
            let tx = await contract.transferFromDistributor(from, to, amount, []);
            
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