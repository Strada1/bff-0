const { MOVIE } = require('../services/movieService');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await MOVIE.CREATE(req.body);
    return res.status(201).send('movie created');
  } catch (e) {
    return res.status(500).send('error');
  }
});

router
  .route('/:movieId')
  .get(async (req, res) => {
    try {
      const movieId = req.params.movieId;
      MOVIE.GET(movieId, (error, movie) => {
        if (error) throw new Error('Read Error');
        return res.status(201).send(movie);
      });
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .delete(async (req, res) => {
    try {
      const movieId = req.params.movieId;
      await MOVIE.DELETE(movieId);
      return res.status(201).send(`movie ${req.params.movieId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .put(async (req, res) => {
    try {
      const movieId = req.params.movieId;
      await MOVIE.UPDATE(movieId, req.body);
      return res.status(201).send(`movie ${req.params.movieId} changed`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

module.exports = router;
