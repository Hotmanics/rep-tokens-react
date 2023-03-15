import { ethers } from "ethers"
import React, { useState } from 'react';
import "./GrantRoles.css";
import { abi } from "../../abi";
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const GrantRoles = (props)=> {

    const [toText, setToText] = useState('');
    const [selectedRole, setSelectedRole] = useState('distributor');

    const handleOnSelectedRole = (event) => {
        setSelectedRole(event.target.value);
    }

    const handleOnToChanged = async (event)=> {
        setToText(event.target.value);

        console.log(await contract.MINTER_ROLE())
    }

    const address = "0x348E826A4D16444673A40074F52bb1590706d9a0";
    const contract = new ethers.Contract(
        address,
        abi,
        props.connectedWalletInfo.provider
    );

    const grantRole = async (roleInBytes)=> {
        try{
            let tx = await contract.grantRole(roleInBytes, toText);
            props.onBoastMessage("granting role " + roleInBytes + " to " + toText + "...");
            await tx.wait();
            props.onBoastMessage("granted role " + roleInBytes + "!");
        } catch (e) {
            props.onBoastMessage(e.reason);
        }
    }

    const grantTheRole = async ()=> {
        console.log(selectedRole);

        if (selectedRole === 'minter') {
            console.log("beh");
            await grantMinterRole();
        }
        if (selectedRole === 'distributor')
            await grantDistributorRole();
        if (selectedRole === 'burner')
            await grantBurnerRole();
        if (selectedRole === 'Soulbound Token Transferer')
            await grantSoulboundTokenTransfererRole();
    }

    const grantBurnerRole = async ()=> {
        await grantRole(await contract.BURNER_ROLE());
    }

    const grantDistributorRole = async ()=> {
        await grantRole(await contract.DISTRIBUTOR_ROLE());
    }

    const grantMinterRole = async ()=> {
        await grantRole(await contract.MINTER_ROLE());
    }

    const grantSoulboundTokenTransfererRole = async ()=> {
        await grantRole(await contract.SOULBOUND_TOKEN_TRANSFERER_ROLE());
    }

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

    return <CenteredCard className="grantMinterRole" title="Grant Roles">

        <p>Recipient</p>
        <input type="text" onChange={handleOnToChanged}/>
        <div id="aye"><select onChange={handleOnSelectedRole} >  
        <option> distributor </option>  
            <option> minter </option>  
            <option> burner </option>  
            <option> admin </option>  
            <option> Soulbound Token Transferer </option>  
        </select>  </div>

        <button onClick={grantTheRole}>Grant Role</button>
        </CenteredCard>
}

export default GrantRoles;