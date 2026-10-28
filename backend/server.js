const express = require("express");
const next = require("next");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8080;

const nestedFrontend = path.join(__dirname, "frontend");
const siblingFrontend = path.join(__dirname, "../frontend");

const frontendDir = fs.existsSync(
  path.join(nestedFrontend, ".next", "required-server-files.json")
)
  ? nestedFrontend
  : siblingFrontend;

console.log("Using frontend directory:", frontendDir);

const app = next({
  dev: false,
  dir: frontendDir,
});

const handle = app.getRequestHandler();
const server = express();

server.use(express.json());

server.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Azure App Service!",
    application: "myapps",
    timestamp: new Date().toISOString(),
  });
});

server.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.prepare()
  .then(() => {
    server.all("/{*path}", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
  });
