const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

function validBook(book) {
  const hasTitle = typeof book.title == 'string' && book.title.trim() != '';
  const hasGenre = typeof book.genre == 'string' && book.genre.trim() != '';
  const hasDescription = typeof book.description == 'string' && book.description.trim() != '';
  return hasTitle && hasGenre && hasDescription
}

router.get('/', (req, res, next) => {
  queries.getAllBooks().then(books => {
    res.json(books)
  });
});

router.get('/:id', (req, res, next) => {
  queries.getBookById(req.params.id).then(user => {
    res.json(user);
  });
});

router.get("/:id/authors", (req, res, next) => {
  queries.getAuthorsByBooks(req.params.id)
    .then(function(books) {
      res.json(books);
    });
});

router.post('/', (req, res, next) => {
  if (validBook(req.body)) {
    queries.createBook(req.body)
      .then(function(books) {
        res.json(books[0]);
      });
  } else {
    next(new Error('Invalid Book'))
  }
});

router.put('/:id', (req, res, next) => {
  if (validBook(req.body)) {
    queries.updateBook(req.params.id, req.body).then(books => {
      res.json(books[0])
    });
  } else {
    next(new Error('Invalid Book'))
  }
});

router.delete('/:id', (req, res, next) => {
  queries.deleteBook(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router
