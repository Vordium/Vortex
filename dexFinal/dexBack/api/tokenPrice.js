const Moralis = require("moralis").default;

const { MORALIS_KEY } = process.env; // You can directly access environment variables in Vercel

module.exports = async (req, res) => {
  const { query } = req;

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

  res.status(200).json(usdPrices);
};
