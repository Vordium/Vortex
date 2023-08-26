const Moralis = require("moralis").default;

module.exports = async (req, res) => {
  const { addressOne, addressTwo } = req.query;

  if (!addressOne || !addressTwo) {
    return res.status(400).json({ error: "Both addresses are required" });
  }

  try {
    Moralis.initialize(process.env.MORALIS_KEY);

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: addressOne,
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: addressTwo,
    });

    const usdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };

    res.status(200).json(usdPrices);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "Internal server error", detailedError: error.message });
  }
};
