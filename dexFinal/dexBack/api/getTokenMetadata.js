// api/getTokenList.js
const cors = require("cors"); // Import the cors middleware

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const corsOptions = {
  origin: "https://swap.vordium.com",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  credentials: true, // Include credentials like cookies in the request
};

app.use(cors(corsOptions)); // Use the cors middleware with specific origin

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
});

module.exports = async (req, res) => {
  try {
    const { address } = req.query;
    const chain = EvmChain.ETHEREUM;
    // Fetch ERC-20 tokens using Moralis
    const response = await Moralis.EvmApi.token.getTokenMetadata({
        addresses: [address],
        chain,
    });

    // Send tokens as JSON response
    res.status(200).json(response.toJSON());
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
}
};
