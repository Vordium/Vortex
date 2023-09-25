import React, { useState } from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";
import  {Profile} from "./profile";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
      <h1>User Profile</h1>
      <Profile />
      {/* Additional components or logic */}
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