// handler.js

const Moralis = require("moralis").default;

const corsOptions = {
  origin: "https://swap.vordium.com",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

module.exports.api = async (event, context) => {
  const query = event.queryStringParameters;

  console.log("Received request with query:", query);

  console.log("Moralis API Key:", process.env.MORALIS_KEY);

  if (!query.addressOne || !query.addressTwo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Both addresses are required" }),
    };
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

    return {
      statusCode: 200,
      body: JSON.stringify(usdPrices),
    };
  } catch (error) {
    console.error("An error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", detailedError: error.message }),
    };
  }
};
