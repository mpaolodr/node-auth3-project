const db = require("../../data/db-config.js");

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return db("users")
        .where({ id })
        .first();
    });
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

module.exports = {
  add,
  findBy
};
