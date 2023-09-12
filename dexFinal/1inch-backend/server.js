const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend
app.use(cors({
    origin: 'https://swap.vordium.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));  

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to make a request to the 1inch API
app.get('/api/1inch/swap', async (req, res) => {
  try {
    const apiKey = process.env['INCH_API_KEY'];

    // Construct the URL with the necessary query parameters
    const apiUrl = `https://api.1inch.dev/swap/v5.2`;

    // Make a request to the 1inch API
    const response = await axios.get(apiUrl);

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
