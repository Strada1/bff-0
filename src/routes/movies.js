const { MOVIE } = require('../services/movieService');
const { COMMENT } = require('../services/commentService');
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

router.post('/:movieId/comment', async (req, res) => {
  try {
    await COMMENT.CREATE({
      comment: req.body.comment,
      movieId: req.params.movieId,
    });
    return res
      .status(201)
      .send(`comment posted on movie ${req.params.movieId}`);
  } catch (error) {
    return res.status(500).send('error');
  }
});

router
  .route('/:movieId')
  .delete(async (req, res) => {
    try {
      await MOVIE.DELETE(req.params.movieId);
      return res.status(201).send(`movie ${req.params.movieId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .put(async (req, res) => {
    try {
      await MOVIE.UPDATE(req.params.movieId, req.body);
      return res.status(201).send(`movie ${req.params.movieId} changed`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

module.exports = router;
