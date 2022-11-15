const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/movies', async (request, response) => {
  response.send('get movies');
});

router.post('/movies', async (request, response) => {
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
});

router.put('/movies/:movieId', async (request, response) => {
  response.send('put movies');
});

router.delete('/movies/:movieId', async (request, response) => {
  const { movieId } = request.params;
  response.send('delete movies');
});

module.exports = router;
