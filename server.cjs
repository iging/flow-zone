const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression for all responses
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Always return the main index.html, so react-router can handle routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
