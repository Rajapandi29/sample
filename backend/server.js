
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());

server.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Azure App Service!",
    application: "myapps",
    timestamp: new Date().toISOString()
  });
});

server.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.prepare()
  .then(() => {
    server.all("/{*path}", (req, res) => handle(req, res));

    server.listen(port, "0.0.0.0", () => {
      console.log(`myapps listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start Next.js:", err);
    process.exit(1);
  });
