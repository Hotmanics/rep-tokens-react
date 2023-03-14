import "./LoggedInSection.css";
import GrantRoles from "../GrantRoles/GrantRoles";
import GeneralContractInfo from "../GeneralContractInfo/GeneralContractInfo";

const LoggedInSection = (props)=> {

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    return <div>
    <GeneralContractInfo onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></GeneralContractInfo>
    <GrantRoles onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></GrantRoles>
    </div>
}

export default LoggedInSection;