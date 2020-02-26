const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
