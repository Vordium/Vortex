import React, { useState, useEffect } from "react";
import axios from "axios";

function Gas() {
  const [gasPrice, setGasPrice] = useState({});

  useEffect(() => {
    const fetchGasPrice = async () => {
      const response = await axios.get('/api/1inch?url=https://api.1inch.dev/gas-price/v1.4/1');
      setGasPrice(response.data);
    };

    fetchGasPrice();
  }, []);

  return (
    <div className="Gas">
      <h1>Ethereum Gas Prices</h1>
      <div>
        <strong>Base Fee:</strong> {gasPrice.baseFee}
      </div>
      {gasPrice.low && (
        <>
          <div>
            <strong>Low:</strong> {gasPrice.low.maxPriorityFeePerGas}
          </div>
          <div>
            <strong>Medium:</strong> {gasPrice.medium.maxPriorityFeePerGas}
          </div>
          <div>
            <strong>High:</strong> {gasPrice.high.maxPriorityFeePerGas}
          </div>
          <div>
            <strong>Instant:</strong> {gasPrice.instant.maxPriorityFeePerGas}
          </div>
        </>
      )}
    </div>
  );
}

export default Gas;