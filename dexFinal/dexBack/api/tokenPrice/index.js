const Moralis = require("moralis").default;

module.exports = async (req, res) => {
  try {
    const { query } = req;

    console.log("Received request with query:", query);

    console.log("Moralis API Key:", process.env.MORALIS_KEY);

    if (!query.addressOne || !query.addressTwo) {
      return res.status(400).json({ error: "Both addresses are required" });
    }

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

    res.status(200).json(usdPrices);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error", detailedError: error.message });
  }
};
