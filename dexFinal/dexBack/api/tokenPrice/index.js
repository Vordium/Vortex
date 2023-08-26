const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  const { query } = req;

  console.log("Received request with query:", query);

  console.log("Moralis API Key:", process.env.MORALIS_KEY);

  if (!query.addressOne || !query.addressTwo) {
    return res.status(400).json({ error: "Both addresses are required" });
  }

  try {
    Moralis.start({
      apiKey: process.env.MORALIS_KEY,
    });

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressOne,
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };

    console.log("Sending response:", usdPrices);

    return res.status(200).json(usdPrices);
  } catch (error) {
    console.error("An error occurred:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", detailedError: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening for API Calls on port ${port}`);
});
