import React, { useState } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";

// Import the connectors from wagmi
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { TrustWalletConnector } from "wagmi/connectors/trustWallet";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

function Header(props) {
  const { address, isConnected, connect } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWalletConnect = async (connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem">Swap</div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem">Tokens</div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" />
          Ethereum
        </div>
        <div className="connectButton">
          {isConnected ? (
            address.slice(0, 4) + "..." + address.slice(38)
          ) : (
            <div>
              <div onClick={() => handleWalletConnect(new MetaMaskConnector())}>MetaMask</div>
              <div onClick={() => handleWalletConnect(new TrustWalletConnector())}>Trust Wallet</div>
              <div onClick={() => handleWalletConnect(new CoinbaseWalletConnector())}>Coinbase Wallet</div>
            </div>
          )}
        </div>
      </div>
      <div className={`mobileMenu ${isMenuOpen ? "open" : ""}`}>
        <div className="menuOverlay" onClick={handleMenuClick}></div>
        <div className="menuContent">
          <Link to="/" className="mobileMenuItem">
            Swap
          </Link>
          <Link to="/tokens" className="mobileMenuItem">
            Tokens
          </Link>
        </div>
      </div>
      <div className={`burgerMenu ${isMenuOpen ? "open" : ""}`} onClick={handleMenuClick}>
        <div className="burgerLine"></div>
        <div className="burgerLine"></div>
        <div className="burgerLine"></div>
      </div>
    </header>
  );
}

export default Header;
