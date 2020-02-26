const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  const dept = req.user.user_department;

  if (dept === "admin") {
    Users.get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: err.message });
      });
  } else {
    Users.getByDep(dept)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  }
});

module.exports = router;
