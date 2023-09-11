const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configure CORS to allow requests from the specified frontend origin
const corsOptions = {
  origin: 'https://swap.vordium.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Define a route that acts as a proxy to 1inch API
app.get('/api/1inch', async (req, res) => {
  try {
    // Retrieve the 1inch API key from the environment variable hosted on Moralis CLI
    const apiKey = process.env.MORALIS_1INCH_API_KEY;

    // Configure Axios with the authorization header
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };

    // Make the request to the 1inch API
    const response = await axios.get(
      'https://api.1inch.dev/swap/v5.2/',
      axiosConfig
    );

    // Forward the response from 1inch API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors and send an error response to the client
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
