const book_author = require('./seed-data/book_author')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE book_author RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('book_author').insert(book_author);
    });
};
