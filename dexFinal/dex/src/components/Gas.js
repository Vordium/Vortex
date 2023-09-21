import React, { useState, useEffect } from "react";
import axios from "axios";

function Gas() {
  const [gasPrice, setGasPrice] = useState({
    baseFee: null,
    low: null,
    medium: null,
    high: null,
    instant: null,
  });

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const response = await axios.get('/api/1inch?url=https://api.1inch.dev/gas-price/v1.4/1');
        const gasData = response.data;

        setGasPrice({
          baseFee: gasData.baseFee,
          low: gasData.low || null,
          medium: gasData.medium || null,
          high: gasData.high || null,
          instant: gasData.instant || null,
        });
      } catch (error) {
        console.error("Error fetching gas price:", error);
        // You can handle the error here, e.g., set an error state.
      }
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
        <div className="GasValue">{gasPrice.medium?.maxPriorityFeePerGas}</div>
      </div>
      <div className="GasRow">
        <div>
          <strong className="GasLabel">High:</strong>
        </div>
        <div className="GasValue">{gasPrice.high?.maxPriorityFeePerGas}</div>
      </div>
      <div className="GasRow">
        <div>
          <strong className="GasLabel">Instant:</strong>
        </div>
        <div className="GasValue">{gasPrice.instant?.maxPriorityFeePerGas}</div>
      </div>
    </div>
  );
}

export default Gas;
