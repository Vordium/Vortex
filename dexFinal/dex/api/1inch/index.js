const axios = require('axios');

// ...

app.get('/api/1inch/', async (req, res) => {
  try {
    const apiKey = process.env.REACT_APP_1INCH_KEY;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };
    const apiUrl = `https://api.1inch.dev/swap/v5.2/`;
    const response = await axios.get(apiUrl, axiosConfig);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});