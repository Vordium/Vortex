import React, { useState } from 'react';
import axios from 'axios';

const TokenSearch = () => {
    const [query, setQuery] = useState('');
    const [tokenInfo, setTokenInfo] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/tokens?query=${query}`);
            const data = response.data;
            if (data.error) {
                setError(data.error);
                setTokenInfo(null);
            } else {
                setError(null);
                setTokenInfo(data);
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching data');
            setTokenInfo(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter ERC-20 Token Address"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <div>Error: {error}</div>}

            {tokenInfo && (
                <div>
                    <img src={tokenInfo.image} alt={tokenInfo.name} />
                    <div>Name: {tokenInfo.name}</div>
                    <div>Symbol: {tokenInfo.symbol}</div>
                </div>
            )}
        </div>
    );
};

export default TokenSearch;
