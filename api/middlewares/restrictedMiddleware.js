const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets.js");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: "Unauthorized" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: "Invalid token" });
  }
}

module.exports = restricted;
