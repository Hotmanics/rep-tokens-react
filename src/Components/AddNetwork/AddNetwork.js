import React, { useState } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"
import "./AddNetwork.css";

const AddNetwork = (props)=> {

    const handleClick = ()=> {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x89",
          rpcUrls: ["https://polygon.llamarpc.com"],
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          blockExplorerUrls: ["https://polygonscan.com/"]
        }]
      });
    }

    return <div className="addNetwork">
            <div>
                <div>Please ensure that your MetaMask is connected to Polygon!</div>
                <button onClick={handleClick}>Add Polygon To MetaMask</button>
            </div>
        </div>
}

export default AddNetwork;