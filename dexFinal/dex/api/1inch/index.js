const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Define the 1inch API URL
    const apiUrl = 'https://api.1inch.dev/swap/v5.2/';

    // Retrieve the 1inch API key from the Vercel environment variable
    const apiKey = process.env['INCH_API_KEY'];

    if (!apiKey) {
      throw new Error('1INCH_API_KEY environment variable not found.');
    }

    // Configure headers for the request to the 1inch API
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    // Make a GET request to the 1inch API with the specified headers
    const response = await axios.get(apiUrl, { headers });

    // Check if the response is "Unauthorized" (status code 401)
    if (response.status === 401) {
      res.status(401).json({ success: false, error: 'Unauthorized' });
    } else {
      // Forward the response from the 1inch API to the client for other status codes
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    // Handle other errors and send an error response to the client
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
