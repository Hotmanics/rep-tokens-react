import { ethers } from "ethers"
import React, { useState, useEffect } from 'react';
import "./RolesReader.css";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { repTokenAddress, repTokensABI } from "../RepTokenInfo";

const RolesReader = (props)=> {

    useEffect(()=> {
        getRoles();
    }, []);

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


    const [finalString, setFinalString] = useState('');

    const getRoles = async (roleInBytes)=> {

        let ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();

        let MINTER_ROLE = await contract.MINTER_ROLE();
        console.log("end");

        let DISTRIBUTOR_ROLE = await contract.DISTRIBUTOR_ROLE();
        let BURNER_ROLE = await contract.BURNER_ROLE();

        let hasMinterRole = await contract.hasRole(MINTER_ROLE, props.connectedWalletInfo.account);
        let hasDistributorRole = await contract.hasRole(DISTRIBUTOR_ROLE, props.connectedWalletInfo.account);
        let hasBurnerRole = await contract.hasRole(BURNER_ROLE, props.connectedWalletInfo.account);
        let hasAdminRole = await contract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasMinterRole) {
            currentRoles.push("Minter");
        }

        if (hasDistributorRole) {
            currentRoles.push("Distributor");
        }

        if (hasBurnerRole) {
            currentRoles.push("Burner");
        }

        let finalString = '';
        for (let i = 0; i < currentRoles.length; i++) {
            if (i === currentRoles.length - 1) {
                finalString += currentRoles[i];
            } else {
                finalString += currentRoles[i] + ", ";
            }
        }

        setFinalString(finalString);
    }


    return <CenteredCard className="rolesReader" title="Your Roles">
        <p>{finalString}</p>
        </CenteredCard>
}

export default RolesReader;