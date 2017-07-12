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
    cover_url: req.body.cover_url,
    description: req.body.description
  }).then(function(result) {
    res.json(result);
  });
});

module.exports = router
