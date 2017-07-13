const express = require('express');

const router = express.Router();

const queries = require('../db/queries')

function validAuthor(author) {
  const hasFirstName = typeof author.first_name == 'string' && author.first_name.trim() != '';
  const hasLastName = typeof author.last_name == 'string' && author.last_name.trim() != '';
  const hasBio = typeof author.bio == 'string' && author.bio.trim() != '';
  return hasFirstName && hasLastName && hasBio
}

router.get('/', (req, res, next) => {
  queries.getAllAuthors().then(authors => {
    res.json(authors)
  });
});

router.get('/:id', (req, res, next) => {
  queries.getAuthorById(req.params.id).then(user => {
    res.json(user);
  });
});

router.get("/:id/books", function(request, response, next) {
  queries.getBooksByAuthors(request.params.id)
    .then(function(authors) {
      response.json(authors);
    });
});

router.delete('/:id', (req, res, next) => {
  queries.deleteAuthor(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

router.post('/', (req, res, next) => {
  if (validAuthor(req.body)) {
    queries.createAuthor(req.body)
      .then(function(authors) {
        res.json(authors[0]);
      });
  } else {
    next(new Error('Invalid Author'))
  }
});

router.put('/:id', (req, res, next) => {
  if (validAuthor(req.body)) {
    queries.updateAuthor(req.params.id, req.body).then(authors => {
      res.json(authors[0])
    });
  } else {
    next(new Error('Invalid Author'))
  }
});


module.exports = router
