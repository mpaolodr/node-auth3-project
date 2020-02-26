const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// router imports
const authRouter = require("../routers/auth/authRouter.js");
const userRouter = require("../routers/users/usersRouter.js");

// restricted middleware
const restricted = require("../api/middlewares/restrictedMiddleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// routers
server.use("/api/auth", authRouter);
server.use("/api/users", restricted, userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is live!" });
});

module.exports = server;
