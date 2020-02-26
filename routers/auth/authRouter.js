const router = require("express").Router();
const bc = require("bcryptjs");

const Auth = require("./auth-models.js");

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

module.exports = router;
