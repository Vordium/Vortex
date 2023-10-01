import React, { useState, useEffect } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import Modal from './Model';
import { Profile } from "./profile";
import {
  useAccount,
  useDisconnect,
  useBalance,
} from 'wagmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';





function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // State to control content visibility
  const [isConnectedButton, setIsConnectedButton] = useState(false);
  //wagmi
  const { address, isConnected } = useAccount()
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
    closeMenu();
    setIsConnectedButton(true);
    openModal(); // Open the modal after connecting
  };

  useEffect(() => {
    if (isConnected) {
      closeModal();
    }
  }, [isConnected]);

  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  const walletBalance = useBalance({
    address: address,
    
  });

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
    {!isConnected && ( 
      // Show the "Connect Wallet" button if not connected
      <button className="connectButtonmenu" onClick={connectWallet}>
        Connect Wallet
      </button>
    )}

    {isConnected && (
      <div className="combined-class">

        {isContentVisible && (
          <div className="walletbalance">
            BALANCE: {walletBalance?.data?.formatted} ETH 
          </div>
        )}

        {isModalOpen && <Modal onClose={closeModal} />}

        <button onClick={disconnect} className="disconnect-button" >
          <FontAwesomeIcon icon={faSignOutAlt} /> {/* Display the Exit icon */}
        </button>
      </div>
    )}
  
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
