import React, { useState } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import Modal from './Model';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const connectWallet = () => {
    // Simulate connecting to the wallet
    setIsConnected(true);
    openModal(); // Open the modal after connecting
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
        <div>
      {!isConnected && ( // Show the "Connect Wallet" button if not connected
        <button className="connectButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
      {isConnected ? ( // If connected, show the code instead of the button
        <div className="container">
          <div className="avatar">
            <img src={ensAvatar || fallbackAvatar} alt="ENS Avatar" className="avatar-img" />
          </div>
          <div className="address">
            <div className="name">
              {ensName ? `${ensName}` : 'Unknown'}
            </div>
            <div className="address-text">
              {addressToShow}
            </div>
          </div>
          <div className="disconnect">
            <button onClick={disconnectWallet} className="disconnect-button">
              Disconnect
            </button>
          </div>
        </div>
      ) : null}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
      </div>
      <div className={`mobileMenu ${isMenuOpen ? "open" : ""}`}>
        <div className="menuOverlay" onClick={closeMenu}></div>
        <div className="menuContent">
          <Link to="/" className="mobileMenuItem" onClick={closeMenu}>
            Swap
          </Link>
          <Link to="/tokens" className="mobileMenuItem" onClick={closeMenu}>
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