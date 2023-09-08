const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Define a route to proxy 1inch API requests
app.get('/1inch-proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    // Make a request to the 1inch API using the provided URL
    const response = await axios.get(url);

    // Send the response from 1inch back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying 1inch API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
