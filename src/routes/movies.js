const express = require('express');
const router = express.Router();
const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../services/movieService');
const { findDirector } = require('../services/directorService');
const { findCategory } = require('../services/categoryService');
const { validate } = require('../middlewares/validate');

router.get('/movies', async (request, response) => {
  try {
    const movies = await getMovies().populate(['category', 'director']);

    response.status(200).send(movies);
  } catch (error) {
    console.log(error);
    response.status(500).send([]);
  }
});

router.post(
  '/movies',
  validate(['title', 'year']),
  async (request, response) => {
    try {
      const { title, category, year, duration, director } = request.body;
      const findedCategory = await findCategory({ category });
      const findedDirector = await findDirector({ director });

      if (!findedCategory) {
        return response.status(400).send({ error: 'category not found' });
      }

      if (!findedDirector) {
        return response.status(400).send({ error: 'director not found' });
      }

      const movie = await createMovie({
        title,
        year,
        duration,
        category: findedCategory._id,
        director: findedDirector._id,
      });

      response.status(201).send(movie);
    } catch (error) {
      console.log(error);
      response.status(500).send({});
    }
  }
);

router.put('/movies/:movieId', async (request, response) => {
  try {
    const { movieId } = request.params;
    const updated = await updateMovie(movieId, request.body);

    response.status(200).send(updated);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

router.delete('/movies/:movieId', async (request, response) => {
  try {
    const { movieId } = request.params;
    const deleted = await deleteMovie(movieId);

    response.status(204).send(deleted);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

module.exports = router;
