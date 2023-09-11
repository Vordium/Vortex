const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Define the 1inch API URL
    const apiUrl = 'https://api.1inch.dev/swap/v5.2/';

    // Make a request to the 1inch API
    const response = await axios.get(apiUrl);

    // Forward the response from the 1inch API to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle errors and send an error response to the client
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
