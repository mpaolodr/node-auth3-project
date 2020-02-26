exports.up = function(knex) {
  return knex.schema.createTable("users", col => {
    col.increments();

    col
      .text("username", 255)
      .unique()
      .notNullable()
      .index();
    col.text("password").notNullable();

    col.text("department", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
