import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [gasPrice, setGasPrice] = useState({});

  useEffect(() => {
    const fetchGasPrice = async () => {
      const timestamp = Date.now(); // Generate a unique timestamp
      const response = await axios.get(`/api/gas-price?cacheBuster=${timestamp}`);
      setGasPrice(response.data);
    }
    fetchGasPrice();
  }, []);

  return (
    <div className="App">
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

export default App;
