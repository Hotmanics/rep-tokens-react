import "./LoggedInSection.css";
import GrantRoles from "../GrantRoles/GrantRoles";
import GeneralContractInfo from "../GeneralContractInfo/GeneralContractInfo";
import NavBar from "../NavBar/NavBar";
import React, { useState } from 'react';
import Distributing from "../Distributing/Distributing";
import Minting from "../Minting/Minting";
import Balance from "../Balance/Balance";
import SXSW from "../SXSW/SXSW";

const LoggedInSection = (props)=> {

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [contractInfoTrigger, setContractInfoTrigger] = useState(0);



    const [output, setOutput] = useState(<SXSW onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></SXSW>);

    const handleStateSet = (state)=> {

        if (state === 'mint') {
            setOutput(<Minting onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Minting>);

        } else if (state === 'distribute') {
            setOutput(<Distributing onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Distributing>);
      
        } else if (state === 'roleGrant') {
            setOutput(<GrantRoles onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></GrantRoles>);
        } else if (state === 'contractInfo') {
            setContractInfoTrigger((contractInfoTrigger) => {
                contractInfoTrigger = contractInfoTrigger + 1;
                setOutput(<GeneralContractInfo onBoastMessage={handleLogger} onContractPageSet={contractInfoTrigger} connectedWalletInfo={props.connectedWalletInfo}></GeneralContractInfo>);
            });
        } else if (state === 'balance') {
            setOutput(<Balance onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Balance>);
        } else if (state === 'SXSW') {
            setOutput(<SXSW onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></SXSW>);
        }
    }

    return <div className="LoggedInSection">
    <NavBar onStateSet={handleStateSet}></NavBar>
    { output }
    </div>
}

export default LoggedInSection;