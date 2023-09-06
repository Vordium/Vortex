const express = require("express");
const Moralis = require("moralis").default;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS for the /tokenPrice route
const corsOptions = {
  origin: "https://swap.vordium.com", // Replace with your specific origin
};

app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS middleware with specific origin

Moralis.initialize(process.env.MORALIS_APPLICATION_ID);
Moralis.serverURL = process.env.MORALIS_SERVER_URL;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/tokenPrice", async (req, res) => {
  // Your code to fetch and send token prices here
  // ...

  // Add the Access-Control-Allow-Origin header to the response
  res.setHeader("Access-Control-Allow-Origin", "https://swap.vordium.com");

  // Send the response
  res.status(200).json(/* Your response data */);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
