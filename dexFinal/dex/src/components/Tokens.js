import React, { useState, useEffect } from 'react';
import tokenList from '../tokenList.json';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const cardStyle = {
  border: '1px',
  borderRadius: '5px',
  boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.5)',
  padding: '10px',
  margin: '10px',
  width: '300px',
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  width: '50px',
  height: '50px',
  marginRight: '10px',
  borderRadius: '70%',
  objectFit: 'cover',
};

const infoStyle = {
  flex: '1',
  fontSize: '14px',
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '100px',
  padding: '50px',
};

const searchStyle = {
  width: '74%',
  padding: '10px',
  border: '1px solid #ccc',
  background: 'transparent',
  color: '#F0FFFF',
  marginBottom: '20px',
  borderRadius: '70%',
};

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
    <div style={containerStyle}>
      <h2>Tokens</h2>
      <input
        type="text"
        placeholder="Search by name or address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={searchStyle}
      />
      <div style={rowStyle}>
        {filteredTokens.map((token) => (
          <div key={token.id} style={cardStyle}>
            <img src={token.img} alt={`${token.name} Logo`} style={logoStyle} />
            <div style={infoStyle}>
              <h3 style={{ fontSize: '16px' }}>{token.name}</h3>
              <p>{token.ticker}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tokens;
