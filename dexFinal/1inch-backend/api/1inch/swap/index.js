const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend (replace 'YOUR_FRONTEND_ORIGIN' with your frontend's origin)
app.use(cors({
  origin: 'https://swap.vordium.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to create Axios instance with the 1inch API key in the headers
const createAxiosInstance = () => {
  return axios.create({
    headers: {
      'Authorization': `Bearer ${process.env.INCH_API_KEY}`, // Retrieve API key from environment variable
    },
  });
};

// Endpoint to get allowance
app.get('/api/1inch/swap/allowance', async (req, res) => {
  try {
    // Extract tokenAddress and walletAddress from query parameters
    const { tokenAddress, walletAddress } = req.query;

    // Construct the URL for the allowance request
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`;

    // Create an Axios instance with headers
    const axiosInstance = createAxiosInstance();

    // Make a request to the 1inch API using the Axios instance
    const response = await axiosInstance.get(apiUrl);

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
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/approve/allowance/transaction?tokenAddress=${tokenAddress}`;

    // Create an Axios instance with headers
    const axiosInstance = createAxiosInstance();

    // Make a request to the 1inch API using the Axios instance
    const response = await axiosInstance.get(apiUrl);

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
    const apiUrl = `https://api.1inch.dev/swap/v5.2/1/swap?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount.padEnd(18, '0')}&fromAddress=${fromAddress}&slippage=${slippage}`;

    // Create an Axios instance with headers
    const axiosInstance = createAxiosInstance();

    // Make a request to the 1inch API using the Axios instance
    const response = await axiosInstance.get(apiUrl);

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
