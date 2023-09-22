const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 9001;

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Enable CORS for your frontend (replace 'YOUR_FRONTEND_ORIGIN' with your frontend's origin)
app.use(cors({
  origin: 'https://swap.vordium.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Endpoint to get allowance
app.get('/api/1inch/swap/allowance', async (req, res) => {
  try {
    // Extract tokenAddress and walletAddress from query parameters
    const { tokenAddress, walletAddress } = req.query;

    // Construct the URL for the allowance request
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`;

    // Make a request to the 1inch API
    const response = await axios.get(apiUrl);

    // Send the 1inch API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error making allowance request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get approval transaction
app.get('/api/1inch/swap/approve-transaction', async (req, res) => {
  try {
    // Extract tokenAddress from query parameters
    const { tokenAddress } = req.query;

    // Construct the URL for the approval transaction request
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/approve/transaction?tokenAddress=${tokenOne.address}`;

    // Make a request to the 1inch API
    const response = await axios.get(apiUrl);

    // Send the 1inch API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error making approval transaction request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to perform the swap
app.get('/api/1inch/swap/perform-swap', async (req, res) => {
  try {
    // Extract parameters from query parameters
    const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query;

    // Construct the URL for the swap request
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`;

    // Make a request to the 1inch API
    const response = await axios.get(apiUrl);

    // Send the 1inch API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error making swap request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});