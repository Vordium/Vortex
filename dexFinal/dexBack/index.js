const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  const { query } = req;

  const responseOne = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne
  });

  const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo
  });

  const usdPrices = {
    tokenOne: responseOne.raw.usdPrice,
    tokenTwo: responseTwo.raw.usdPrice,
    ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice
  };

  return res.status(200).json(usdPrices);
});

// No need for app.listen() anymore since Vercel will handle this.

// Start Moralis after setting up the Express app
Moralis.start({
  apiKey: process.env.MORALIS_KEY,
});

// No need to specify the port and listen, Vercel will handle this automatically.
