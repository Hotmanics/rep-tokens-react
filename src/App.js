import "./App.css";
import React, { useState, useEffect } from 'react';
import "./Components/Buttons/buttons.css";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet";
import Logger from "./Components/Logger/Logger";
import LoggedInSection from "./Components/LoggedInSection/LoggedInSection";

function App() {

  useEffect(() => {
    document.title = "ATX DAO Rep"
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

  let output = <div>
  <ConnectWallet onBoastMessage={handleLogger} onWalletConnected={handleLogin}></ConnectWallet>
  <Logger boastMessage={message} connectedWalletInfo={connectedWalletInfo}></Logger>
  {loginComponents}</div>;

  return (
    <div className="app">
      <header>
        {output}
      </header>
    </div>
  );
}

export default App;