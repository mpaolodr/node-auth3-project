const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// router imports
const authRouter = require("../routers/auth/authRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// routers
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live!" });
});

module.exports = server;
