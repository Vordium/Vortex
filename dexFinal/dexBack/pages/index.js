import React, { useState } from "react";
import styles from "../public/styles.css";

const IndexPage = () => {
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [result, setResult] = useState(null);

  const handleFetchData = async () => {
    try {
      const response = await fetch(
        `/api/tokenPrice?addressOne=${addressOne}&addressTwo=${addressTwo}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Crypto Token Price Ratio</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Token Address One"
          value={addressOne}
          onChange={(e) => setAddressOne(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token Address Two"
          value={addressTwo}
          onChange={(e) => setAddressTwo(e.target.value)}
        />
        <button onClick={handleFetchData}>Get Ratio</button>
      </div>
      {result && (
        <div id="result" className={styles.result}>
          <p>Token One Price: ${result.tokenOne}</p>
          <p>Token Two Price: ${result.tokenTwo}</p>
          <p>Price Ratio: {result.ratio}</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
