const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

app.use(cors());

const API_KEY = process.env.API_KEY;
const CX = process.env.CX;

app.get("/", (req, res) => {
  res.send("ImmoScore Backend OK");
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const url =
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
