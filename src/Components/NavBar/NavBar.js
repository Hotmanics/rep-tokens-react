import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import "./NavBar.css";
const NavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard className="navBar">
        <button onClick={()=> {handleClick('contractInfo')}}>
            Contract Info
        </button>

        <button onClick={()=> {handleClick('balance')}}>
            Account
        </button>

        <button onClick={()=> {handleClick('mint')}}>
            Minting
        </button>

        <button onClick={()=> {handleClick('distribute')}}>
            Distributing
        </button>

        <button onClick={()=> {handleClick('roleGrant')}}>
            Admin
        </button>

        <div>
        <button id="consensys" onClick={()=> {handleClick('SXSW')}}>
            SPECIAL - CONSENSYS
        </button>

        </div>
    </CenteredCard>
}

export default NavBar;