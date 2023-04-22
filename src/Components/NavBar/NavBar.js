import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const NavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
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
{/* 
        <button onClick={()=> {handleClick('SXSW')}}>
            Burn For Beer - Consensys
        </button> */}
    </CenteredCard>
}

export default NavBar;