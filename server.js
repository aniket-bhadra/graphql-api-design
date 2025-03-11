const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
