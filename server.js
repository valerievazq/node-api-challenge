const express = require("express");
const helmet = require("helmet");
const logger = require("./data/routers/logger");
const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");

const server = express();

server.use(helmet());
server.use(logger());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to my API</h1>`);
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
