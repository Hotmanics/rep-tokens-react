import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import { abi } from "../../abi";
import React, { useState } from "react";

const GeneralContractInfo = (props)=> {

    const [maxMintAmount, setMaxMintAmount] = useState(0);

    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
        props.connectedWalletInfo.provider
    );

    const getMaxMintAmountPerTx = async ()=> {
        let x = await contract.maxMintAmountPerTx();
        setMaxMintAmount(x.toNumber());
    }

    getMaxMintAmountPerTx();

    return <div className="generalContractInfo">
        <p>Contract Information</p>
        <p>Max Mint Amount Per Tx: {maxMintAmount}</p>
        </div>
}

export default GeneralContractInfo;
