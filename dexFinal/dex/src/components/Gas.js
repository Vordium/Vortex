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
  <div className="GasHeader">
    <span className="GasLabel">Ethereum Gas Prices</span>
  </div>
  <div className="GasRow">
    <div>
      <strong className="GasLabel">Base Fee:</strong>
    </div>
    <div className="GasValue">{gasPrice.baseFee}</div>
  </div>
  {gasPrice.low && (
    <div className="GasRow">
      <div>
        <strong className="GasLabel">Low:</strong>
      </div>
      <div className="GasValue">{gasPrice.low.maxPriorityFeePerGas}</div>
    </div>
  )}
  <div className="GasRow">
    <div>
      <strong className="GasLabel">Medium:</strong>
    </div>
    <div className="GasValue">{gasPrice.medium.maxPriorityFeePerGas}</div>
  </div>
  <div className="GasRow">
    <div>
      <strong className="GasLabel">High:</strong>
    </div>
    <div className="GasValue">{gasPrice.high.maxPriorityFeePerGas}</div>
  </div>
  <div className="GasRow">
    <div>
      <strong className="GasLabel">Instant:</strong>
    </div>
    <div className="GasValue">{gasPrice.instant.maxPriorityFeePerGas}</div>
  </div>
</div>
  );
}

export default Gas;