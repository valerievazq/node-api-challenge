const express = require("express");
const helmet = require("helmet");
const logger = require("./data/routers/logger");
const projectRouter = require("./data/routers/projectRouter");
const actionRouter = require("./data/routers/actionRouter");
const server = express();
const welcomeRouter = require("./welcome/welcomeRouter");

server.use(helmet());
server.use(logger());
server.use(express.json());

server.use("/", welcomeRouter);
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
