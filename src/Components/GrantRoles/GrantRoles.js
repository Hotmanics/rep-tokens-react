import { ethers } from "ethers"
import React, { useState } from 'react';
import "./GrantRoles.css";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";
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

    const address = repTokenAddress;
    const contract = new ethers.Contract(
        address,
        repTokensABI,
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
        await grantRole(await contract.TOKEN_MIGRATOR_ROLE());
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

    const [maxMint, setMaxMint] = useState(0);
    const handleMaxMint = (event)=> {
        setMaxMint(event.target.value);
    }

    const setMax = async ()=> {
        try{
            let tx = await contract.setMaxMintAmount(maxMint);
            
            props.onBoastMessage('setting max mint to ' + maxMint + "...");
            await tx.wait();
            props.onBoastMessage(`set max mint to ${maxMint}!`);
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
            <option> token migrator </option>  
        </select>  </div>

        <button onClick={grantTheRole}>Grant Role</button>

        <div>
            <p>Max Mint Amount</p>
            <input type="number" onChange={handleMaxMint}/>
            <div>
                <button onClick={setMax}>Set Max</button>
            </div> 
        </div>

        </CenteredCard>
}

export default GrantRoles;