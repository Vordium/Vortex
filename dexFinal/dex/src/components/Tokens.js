import React from 'react';
import tokenList from './src/tokenList.json'; // Make sure to adjust the path based on your project structure

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  width: '200px',
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
            <h3>{token.name}</h3>
            <p>{token.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tokens;
