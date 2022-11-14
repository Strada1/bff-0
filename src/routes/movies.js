const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router
  .route('/movies')
  .get(async (request, response) => {
    response.send('get movies');
  })
  .post(async (request, response) => {
    try {
      const { title, category, year, duration, director } = request.body;

      const movie = await Movie.create({
        title,
        category,
        year,
        duration,
        director,
      });

      response.status(201).send(movie);
    } catch (error) {
      console.log(error);
      response.status(400).send({});
    }
  })
  .put(async (request, response) => {
    response.send('put movies');
  })
  .delete(async (request, response) => {
    response.send('delete movies');
  });

module.exports = router;
