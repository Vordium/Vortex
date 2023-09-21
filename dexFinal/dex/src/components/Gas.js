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

  const [exchangeRates, setExchangeRates] = useState({
    tokenOne: null,
    tokenTwo: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Fetch exchange rates
        const exchangeRatesResponse = await axios.get('https://api.vordium.com/api/tokenPrice', {
          params: {
            addressOne: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            addressTwo: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          },
        });

        setExchangeRates({
          tokenOne: exchangeRatesResponse.data.tokenOne,
          tokenTwo: exchangeRatesResponse.data.tokenTwo,
        });

        setLoading(false); // Set loading to false once data is fetched successfully
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again."); // Set an error message
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchGasPrice();
  }, []);

  // Function to calculate gas prices in USD
  const calculateGasPriceInUSD = (priceInGwei, exchangeRate) => {
    if (priceInGwei !== null && exchangeRate !== null) {
      return (priceInGwei * exchangeRate).toFixed(2); // Assuming 2 decimal places
    }
    return null;
  };

  return (
    <div className="Gas">
      <div className="GasHeader">
        <span className="GasLabel">Ethereum Gas Prices</span>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div className="GasRow">
            <div>
              <strong className="GasLabel">Base Fee (USD):</strong>
            </div>
            <div className="GasValue">${calculateGasPriceInUSD(gasPrice.baseFee, exchangeRates.tokenOne)}</div>
          </div>
          {gasPrice.low && (
            <div className="GasRow">
              <div>
                <strong className="GasLabel">Low (USD):</strong>
              </div>
              <div className="GasValue">${calculateGasPriceInUSD(gasPrice.low.maxPriorityFeePerGas, exchangeRates.tokenOne)}</div>
            </div>
          )}
          <div className="GasRow">
            <div>
              <strong className="GasLabel">Medium (USD):</strong>
            </div>
            <div className="GasValue">${calculateGasPriceInUSD(gasPrice.medium?.maxPriorityFeePerGas, exchangeRates.tokenOne)}</div>
          </div>
          <div className="GasRow">
            <div>
              <strong className="GasLabel">High (USD):</strong>
            </div>
            <div className="GasValue">${calculateGasPriceInUSD(gasPrice.high?.maxPriorityFeePerGas, exchangeRates.tokenOne)}</div>
          </div>
          <div className="GasRow">
            <div>
              <strong className="GasLabel">Instant (USD):</strong>
            </div>
            <div className="GasValue">${calculateGasPriceInUSD(gasPrice.instant?.maxPriorityFeePerGas, exchangeRates.tokenOne)}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gas;
