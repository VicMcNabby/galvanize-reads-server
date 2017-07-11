const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

router.get('/', (req, res, next) => {
  queries.getAllAuthors().then(authors => {
    res.json(authors)
  });
});

router.get("/:id", function(request, response, next) {
  queries.getBooksByAuthors(request.params.id)
    .then(function(authors) {
      response.json(authors);
    });
});

module.exports = router
