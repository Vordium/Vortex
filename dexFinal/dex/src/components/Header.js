import React, { useState } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { address, isConnected, connect } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        <div className="connectButton" onClick={connect}>
          {isConnected ? (
            address.slice(0, 4) + "..." + address.slice(38)
          ) : (
            "Connect"
          )}
        </div>
        {/* Mobile burger menu */}
        <div className="mobileBurgerMenu" onClick={toggleMenu}>
          <div className={isOpen ? "burgerLine open" : "burgerLine"}></div>
          <div className={isOpen ? "burgerLine open" : "burgerLine"}></div>
          <div className={isOpen ? "burgerLine open" : "burgerLine"}></div>
        </div>
      </div>
      {/* Mobile menu items */}
      <div className={isOpen ? "mobileMenu open" : "mobileMenu"}>
        <Link to="/" className="link">
          <div className="headerItem" onClick={toggleMenu}>
            Swap
          </div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem" onClick={toggleMenu}>
            Tokens
          </div>
        </Link>
      </div>
    </header>
    
  );
}


export default Header;
