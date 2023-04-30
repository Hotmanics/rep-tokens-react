import React, { useEffect, useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import "./NavBar.css";
const NavBar = (props)=> {

    useEffect(()=> {
        getRoles();
    }, []);

    const [roles, setRoles] = useState([]);

    const getRoles = async ()=> {
        let ADMIN_ROLE = await props.contract.DEFAULT_ADMIN_ROLE();
        let MINTER_ROLE = await props.contract.MINTER_ROLE();
        let DISTRIBUTOR_ROLE = await props.contract.DISTRIBUTOR_ROLE();
        let BURNER_ROLE = await props.contract.BURNER_ROLE();
        let TOKEN_MIGRATOR_ROLE = await props.contract.TOKEN_MIGRATOR_ROLE();

        let hasAdminRole = await props.contract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);
        let hasMinter = await props.contract.hasRole(MINTER_ROLE, props.connectedWalletInfo.account);
        let hasDistributor = await props.contract.hasRole(DISTRIBUTOR_ROLE, props.connectedWalletInfo.account);
        let hasBurner = await props.contract.hasRole(BURNER_ROLE, props.connectedWalletInfo.account);
        let hasTokenMigrator = await props.contract.hasRole(TOKEN_MIGRATOR_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasMinter) {
            currentRoles.push("Minter");
        }

        if (hasDistributor) {
            currentRoles.push("Distributor");
        }

        if (hasBurner) {
            currentRoles.push("Burner");
        }

        if (hasTokenMigrator) {
            currentRoles.push("Token Migrator");
        }

        setRoles(currentRoles);
    }

    const testForRole = (roles, name)=> {
        for (let i = 0; i < roles.length; i++) {
            console.log("ae");
            console.log(roles[i]);
            if (roles[i] === name) {
                return true;
            }
        }

        return false;
    }

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   

    let finalRoles = [];
    finalRoles = roles;

    let minter;
    if (testForRole(finalRoles, "Minter")) {
        minter = <button onClick={()=> {handleClick('mint')}}>
            Minting
        </button>;
    }

    let distributor;
    if (testForRole(finalRoles, "Distributor")) {
        distributor = 
        <button onClick={()=> {handleClick('distribute')}}>
            Distributing
        </button>;
    }

    let admin;
    if (testForRole(finalRoles, "Admin")) {
        admin = 
        <button onClick={()=> {handleClick('roleGrant')}}>
            Admin
        </button>;
    }

    return <div className="navBar">
            <button onClick={()=> {handleClick('contractInfo')}}>
                Contract Info
            </button>

            <button onClick={()=> {handleClick('balance')}}>
                Account
            </button>

            <div>
            { minter }        
            { distributor }
            { admin }
            </div>
    </div>
}

export default NavBar;