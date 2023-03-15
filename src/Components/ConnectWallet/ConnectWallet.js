import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"
import React, { useState } from 'react';
import "./ConnectWallet.css";
import LeftCard from "../Cards/Left Card/LeftCard";

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // required
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "web3modal", // Required
        infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // Required
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: false, // Optional. Use dark theme, defaults to false
      },
    },
    binancechainwallet: {
      package: true,
    },
  };
  
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: false, // optional
    displayNoInjectedProvider: false,
    disableInjectedProvider: false,
    providerOptions, // required
  });

const ConnectWallet = (props)=> {

    const [connectedWalletInfo, setConnectedWalletInfo] = useState('');

    const connectWallet = async () => {
        //keep for dev purposes - if not present then app will remember Metamask and not display the modal
        web3Modal.clearCachedProvider()
    
        try{

            const provider = await web3Modal.connect();
            const etherProvider = new ethers.providers.Web3Provider(provider);
        
            await etherProvider.send("eth_requestAccounts");
            const accounts = await etherProvider.listAccounts();
  
            const connectedWalletInfo = {
              account: accounts[0],
              provider: etherProvider.getSigner(),
          }
  
          props.onWalletConnected(connectedWalletInfo);
          setConnectedWalletInfo(connectedWalletInfo);
        } catch (e) {
          props.boastMessage(e.reason);
        }

    };

    let buttonSection = connectedWalletInfo.account === undefined ? 
                            <button type="button" onClick={connectWallet}>
                                Login
                            </button> :
                            <div></div>;

    const accountInfo = connectedWalletInfo.account === undefined ? <p>Please login.</p>
                        : <p>You are logged in as: { connectedWalletInfo.account }</p>
    return <div className="connectWallet">
        { buttonSection } 
        { accountInfo }
        </div>
}

export default ConnectWallet;