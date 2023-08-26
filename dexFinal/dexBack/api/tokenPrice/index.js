const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { addressOne, addressTwo } = req.query;

  if (!addressOne || !addressTwo) {
    return res.status(400).json({ error: "Both addresses are required" });
  }

  try {
    const responseOne = await fetch(
      `https://deep-index.moralis.io/api/v2/token/${addressOne}`,
      {
        headers: {
          "X-API-Key": process.env.MORALIS_KEY,
        },
      }
    );
    const dataOne = await responseOne.json();

    const responseTwo = await fetch(
      `https://deep-index.moralis.io/api/v2/token/${addressTwo}`,
      {
        headers: {
          "X-API-Key": process.env.MORALIS_KEY,
        },
      }
    );
    const dataTwo = await responseTwo.json();

    const usdPrices = {
      tokenOne: dataOne.data.price,
      tokenTwo: dataTwo.data.price,
      ratio: dataOne.data.price / dataTwo.data.price,
    };

    res.status(200).json(usdPrices);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "Internal server error", detailedError: error.message });
  }
};

