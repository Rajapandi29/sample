
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Azure App Service!",
    application: "Dynamic Backend",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});
