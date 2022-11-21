const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.model');
const movieService = require('../services/movies.service');
const commentsService = require('../services/comments.service');

router.get('/', async (req, res) => {
  try {
    const movies = await movieService
      .getMovie()
      .populate(['category', 'director']);
    return res.status(200).send(movies);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await movieService.createMovie({
      title: req.body.title,
      category: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director,
    });
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const idMovie = req.params.id;
    const movie = await movieService.updateMovie(idMovie, {
      title: req.body.title,
      category: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director,
    });
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const idMovie = req.params.id;
    const movie = await movieService.deleteMovie(req.params.id);
    const comments = await commentsService.deleteCommentsByMovie(idMovie);
    return res.status(200).json({ movie, comments });
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.post(`/:id/comments`, async (req, res) => {
  try {
    const idMovie = req.params.id;
    const comment = await commentsService.createCommentByMovie(
      idMovie,
      req.body.description
    );
    return res.status(201).send(comment);
  } catch (e) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const idMovie = req.params.id;
    const comments = commentsService.getCommentsByMovie(idMovie);
    return res.status(200).send(comments);
  } catch (e) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
