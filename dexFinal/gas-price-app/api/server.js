const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files from the React frontend app (to be added later)
app.use(express.static(path.join(__dirname, "client/build")));

// Serve the React app at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Create an API route to fetch gas prices
app.get("/gas-price", async (req, res) => {
  try {
    const response = await axios.get("https://api.1inch.dev/gas-price/v1.4/1");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gas prices" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
