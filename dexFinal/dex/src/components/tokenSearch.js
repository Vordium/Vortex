// TokenSearch.js

import React, { useState } from "react";
import axios from "axios";

const TokenSearch = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokens, setTokens] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.vordium.com/api/getTokenMetadata?address=${tokenAddress}`);
      setTokens(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {tokens.map((token) => (
          <div key={token.id}>
            <h2>{token.name}</h2>
            <p>Symbol: {token.symbol}</p>
            <p>Decimals: {token.decimals}</p>
            {/* Add more token properties as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenSearch;
