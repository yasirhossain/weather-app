exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('post', (table) => {
      table.increments();
      table.timestamps();
      table.string('title');
      table.string('content');
    })
      .createTable('comment', (table) => {
        table.increments();
        table.timestamps();
        table.string('content');
        table.integer('post_id').unsigned().references('id').inTable('post').onDelete('CASCADE');
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('post'),
    knex.schema.dropTable('comment'),
  ]);
};
