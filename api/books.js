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

module.exports = router
