import React from "react";
import ReactDOM from "react-dom/client";
import './polyfills';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Vordium',
  projectId: '06d9a2bc15df6af2c75cb75e600bd131',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
reportWebVitals();