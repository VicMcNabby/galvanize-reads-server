const books = require('./seed-data/books')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE books RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('books').insert(books);
    });
};
