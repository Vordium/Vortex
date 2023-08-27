import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { TrustWalletConnector } from "wagmi/connectors/trustWallet";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// Import your components
import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";
import "./App.css";

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  // Create an array of wallet connector options
  const connectorOptions = [
    { label: "MetaMask", connector: new MetaMaskConnector() },
    { label: "Trust Wallet", connector: new TrustWalletConnector() },
    { label: "Coinbase Wallet", connector: new CoinbaseWalletConnector() },
  ];

  // State to store the selected connector
  const [selectedConnector, setSelectedConnector] = useState(null);

  // Function to handle connecting with the selected wallet
  const handleConnect = async () => {
    if (selectedConnector) {
      try {
        await connect({ connector: selectedConnector.connector });
      } catch (err) {
        console.error("Error connecting:", err);
      }
    }
  };

  return (
    <div className="App">
      {/* Header component */}
      <Header connect={handleConnect} isConnected={isConnected} address={address} />

      {/* Connector options */}
      <div className="connectorOptions">
        <p>Select a wallet connector:</p>
        {connectorOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelectedConnector(option)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="mainWindow">
        <Routes>
          <Route
            path="/"
            element={<Swap isConnected={isConnected} address={address} />}
          />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
