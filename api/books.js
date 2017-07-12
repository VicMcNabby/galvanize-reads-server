const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

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

router.get("/:id/authors", function(request, response, next) {
  queries.getAuthorsByBooks(request.params.id)
    .then(function(books) {
      response.json(books);
    });
});

router.post('/', function(req, res, next) {
  queries.createBook({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }).then(function(result) {
    res.json(result);
  });
});

router.delete('/:id', (req, res, next) => {
  queries.deleteBook(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router
