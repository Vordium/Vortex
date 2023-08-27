import React from 'react';
import tokenList from '../tokenList.json'; // Make sure to adjust the path based on your project structure

const cardStyle = {
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
  borderRadius: '50%',
  objectFit: 'cover',
};

const infoStyle = {
  flex: '1',
  fontSize: '14px', // Adjust the font size here
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

function Tokens() {
  return (
    <div>
      <h2>Tokens</h2>
      <div style={rowStyle}>
        {tokenList.map(token => (
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
