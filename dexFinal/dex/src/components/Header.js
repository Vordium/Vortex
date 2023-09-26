import React, { useState } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import Modal from './Model';
import { Profile } from "./profile";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  const disconnectWallet = () => {
    // Simulate disconnecting from the wallet
    setIsConnected(false); // Reset isConnected to false
    closeModal(); // Close the modal when disconnecting
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
          {isConnected ? (
            <div>
              <Profile />
              {/* Additional components or logic */}
              <button onClick={disconnectWallet}>Disconnect</button>
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
