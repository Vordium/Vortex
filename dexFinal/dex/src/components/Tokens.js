import React, { useState, useEffect } from 'react';
import tokenList from '../tokenList.json';
import './tokens.css';

function Tokens() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState(tokenList);

  useEffect(() => {
    const filtered = tokenList.filter(
      (token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchQuery]);

  return (
    <div className="tokenshow" style={containerStyle}>
  {/* Search input field */}
  <input
    type="text"
    placeholder="Search by name or address"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={searchStyle}
  />
  
  {/* List of filtered tokens/cards */}
  <div style={rowStyle}>
    {filteredTokens.map((token) => (
      <div key={token.id} className="cardtoken" style={cardStyle}>
        {/* Token logo */}
        <img src={token.img} alt={`${token.name} Logo`} className="logotoken" style={logoStyle} />
        
        {/* Token information */}
        <div className="infotoken" style={infoStyle}>
          {/* Token name */}
          <h3 style={{ fontSize: '16px' }}>{token.name}</h3>
          
          {/* Token ticker */}
          <p>{token.ticker}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Tokens;
