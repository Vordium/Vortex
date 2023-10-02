// api/tokens.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const query = req.query.query; // Get the search query from the request URL
        const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${query}`);
        const tokens = await response.json();
        res.status(200).json(tokens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
