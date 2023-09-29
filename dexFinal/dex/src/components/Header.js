import React, { useState, useEffect } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import Modal from './Model';
import { Profile } from "./profile";
import {
  useAccount,
  useDisconnect,
} from 'wagmi';
import Gas from "./Gas";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // State to control content visibility
  const [isConnectedButton, setIsConnectedButton] = useState(false);
  //wagmi
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsContentVisible(false); // Hide content when the modal is opened
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsContentVisible(true); // Show content when the modal is closed
  };

  const connectWallet = () => {
    // Simulate connecting to the wallet
    setIsConnectedButton(true);
    openModal(); // Open the modal after connecting
  };

  useEffect(() => {
    if (isConnected) {
      closeModal();
    }
  }, [isConnected]);

  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  // Function to toggle the box's expansion
  const toggleBoxExpansion = () => {
    setIsBoxExpanded(!isBoxExpanded);
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
              {isContentVisible && (
                <div>
                  <Profile />
                  {/* Additional components or logic */}
                </div>
              )}
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
      
        <div className="expandableContainer">
          <div className="expandableBox" onClick={toggleBoxExpansion}>
            <div className="expandableBoxHeader">
              Gas Prices <DownOutlined />
            </div>
          </div>

          {/* Conditionally render the <Gas /> component when the box is expanded */}
          {isBoxExpanded && (
            <div className="expandedContent">
              <Gas />
              {/* Add other elements inside the expanded container */}
            </div>
          )}
        </div>
      
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
