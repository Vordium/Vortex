const express = require("express");
const Moralis = require("moralis").default;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

Moralis.initialize(process.env.MORALIS_APPLICATION_ID);
Moralis.serverURL = process.env.MORALIS_SERVER_URL;

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/tokenPrice", async (req, res) => {
  // Same code from your original /tokenPrice route
  // ...
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
