
exports.up = function(knex) {
  return knex.schema.alterTable('users', tbl => {
    tbl.unique('username')
  })
};

exports.down = function(knex) {
  return knex.schema.Table('users', tbl => {
    tbl.dropUnique('username')
  })
  };
