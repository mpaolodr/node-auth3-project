const db = require("../../data/db-config.js");

function get() {
  return db("users");
}

module.exports = {
  get
};
