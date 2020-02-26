const router = require("express").Router();
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Auth = require("./auth-models.js");

const { jwtSecret } = require("../../api/config/secrets.js");

router.post("/register", (req, res) => {
  const userData = req.body;

  if (userData.username && userData.password && userData.department) {
    const hash = bc.hashSync(userData.password, 10);

    userData.password = hash;

    Auth.add(userData)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: "User cannot be registered at this moment" });
      });
  } else {
    res.status(400).json({ errorMessage: "Missing Fields" });
  }
});

router.post("/login", (req, res) => {
  const userData = req.body;

  if (userData.username && userData.password) {
    Auth.findBy({ username: userData.username })
      .then(user => {
        if (user && bc.compareSync(userData.password, user.password)) {
          const token = signToken(user);

          res.status(200).json({ token });
        } else {
          res.status(401).json({ errorMessage: "Unauthorized" });
        }
      })
      .catch(err => {
        res.status(404).json({ errorMessage: "Invalid user" });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide credentials" });
  }
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    user_department: user.department
  };

  const options = {
    expiresIn: "2h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
