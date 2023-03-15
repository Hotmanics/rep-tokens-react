import "./Minting.css";
import { ethers } from "ethers"
import React, { useState } from 'react';
import { abi } from "../../abi";
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const Minting = (props)=> {
    const [toText, setToText] = useState('');
    const [amount, setAmount] = useState('');

    const handleOnToChanged = (event)=> {
        setToText(event.target.value);
    }

    const handleAmountChanged = (event)=> {
        setAmount(event.target.value);
    }
 
    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
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