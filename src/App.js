import "./App.css";
import React, { useState, useEffect } from 'react';
import "./Components/Buttons/buttons.css";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet";
import Logger from "./Components/Logger/Logger";
import LoggedInSection from "./Components/LoggedInSection/LoggedInSection";
import Lost from "./Components/Lost/Lost";
import AddNetwork from "./Components/AddNetwork/AddNetwork";

function App() {

  useEffect(() => {
    document.title = "Rep - ATX DAO"
    }, []);


  const [connectedWalletInfo, setConnectedWalletInfo] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (info)=> {
    setConnectedWalletInfo(info);

    setLoginComponents(
      info.provider === undefined ?
        <div></div> : 
        <LoggedInSection onBoastMessage={handleLogger} connectedWalletInfo={info}></LoggedInSection>
        );
  }

  const handleLogger = (message)=> {
    setMessage(message);
  }

  const [loginComponents, setLoginComponents] = useState('');

  let extra;
  if (connectedWalletInfo === undefined) {
    extra = <Lost></Lost>;
  }

  let output = <div>
  <div id="margined">
    <ConnectWallet onWalletConnected={handleLogin}></ConnectWallet>
  </div>
  <div id="margined">
    {extra}
  </div>
  <div id="margined">
    <AddNetwork></AddNetwork>
  </div>
  {loginComponents}
</div>


  // let output = <div>
  // <ConnectWallet onBoastMessage={handleLogger} onWalletConnected={handleLogin}></ConnectWallet>
  // <Logger boastMessage={message} connectedWalletInfo={connectedWalletInfo}></Logger>
  // {loginComponents}</div>;

  return (
    <div className="app">
      <header>
        {output}
      </header>
    </div>
  );
}

export default App;