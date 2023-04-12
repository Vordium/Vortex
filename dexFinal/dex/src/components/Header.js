import React from "react";
import Logo from "../moralis-logo.svg";
import Eth from "../eth.svg";
import { Link } from "react-router-dom";

function Header(props) {

  const {address, isConnected, connect} = props;

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
          {isConnected ? (address.slice(0,4) +"..." +address.slice(38)) : "Connect"}
        </div>
        <div className="headerItem">
          <nav class="main-menu">
            <ul>
             <li><a href="https://swap.vordium.com/swap">Swap</a></li>
             <li><a href="https://swap.vordium.com/tokens">Tokens</a></li>
             <li><a href="#">Services</a></li>
             <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

  );
}
$('.burger-icon').click(function() {
  $('.main-menu ul').toggle(); /* Toggle the visibility of the menu items */
});

export default Header;
