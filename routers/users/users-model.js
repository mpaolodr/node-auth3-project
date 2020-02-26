const db = require("../../data/db-config.js");

function get() {
  return db("users");
}

function getByDep(dep) {
  return db("users").where({ department: dep });
}

module.exports = {
  get,
  getByDep
};
