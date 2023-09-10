const express = require('express');
const axios = require('axios');
const cors = require('cors'); // If not already configured

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS to allow requests from your frontend origin
const corsOptions = {
  origin: 'https://swap.vordium.com',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware and route configuration goes here

// Define a route that makes a request to the 1inch API with authorization headers
app.get('/api/1inch', async (req, res) => {
  try {
    // Retrieve the 1inch API key from the environment variable
    const apiKey = process.env.REACT_APP_1INCH_KEY;

    // Configure Axios with the authorization header
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };

    // Make the request to the 1inch API
    const response = await axios.get(
      'https://api.1inch.dev/',
      axiosConfig
    );

    // Handle the response and send it to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors and send an error response to the client
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
