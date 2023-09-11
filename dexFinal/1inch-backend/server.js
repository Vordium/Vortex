const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the CORS middleware
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend (replace '*' with the actual origin of your frontend)
app.use(cors({
  origin: 'https://swap.vordium.com', // Change to your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to proxy requests to the 1inch API
app.get('/api/1inch/swap', async (req, res) => {
  try {
    const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.query;
    const apiKey = process.env['1INCH_API_KEY'];

    const apiUrl = 'https://api.1inch.dev/swap/v5.2/';
    const params = {
      fromTokenAddress,
      toTokenAddress,
      amount,
      fromAddress,
      slippage,
      apiKey,
    };

    // Make a request to the 1inch API with query parameters
    const response = await axios.get(apiUrl, { params });

    // Send the 1inch API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error making 1inch API request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
