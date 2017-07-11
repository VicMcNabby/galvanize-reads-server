const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

router.get('/', (req, res, next) => {
  queries.getAllAuthors().then(authors => {
    res.json(authors)
  });
});
router.get("/:id", function(request, response, next) {
  queries.getAuthorsByBooks(request.params.id)
    .then(function(books) {
      response.json(books);
    });
});

module.exports = router
