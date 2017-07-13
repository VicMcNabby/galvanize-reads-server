const knex = require('./knex')

module.exports = {
  getAllBooks() {
    return knex('books')
  },
  getAllAuthors() {
    return knex('authors')
  },
  getBookById(id) {
    return knex('books').where('id', id);
  },
  getAuthorById(id) {
    return knex('authors').where('id', id);
  },
  getAuthorsByBooks(id) {
    return knex('authors').where('book_id', id)
      .join('book_author', 'author_id', 'authors.id');
  },
  getBooksByAuthors(id) {
    return knex('books').where('author_id', id)
      .join('book_author', 'book_id', 'books.id')
  },
  createBook(book) {
    return knex('books').insert(book, '*');
  },
  updateBook(id, book) {
    return knex('books').where('id', id).update(book, '*')
  },
  deleteBook(id) {
    return knex('books').where('id', id).del()
  },
  deleteAuthor(id) {
    return knex('authors').where('id', id).del()
  },
  updateAuthor(id, author) {
    return knex('authors').where('id', id).update(author, '*')
  },
  createAuthor(author) {
    return knex('authors').insert(author, '*');
  }
}
