const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.model');
const movieService = require('../services/movies.service');

router.get('/', async (req, res) => {
  try {
    const response = await movieService
      .getMovie()
      .populate(['category', 'director']);
    return res.status(200).send(response);
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
    const response = await movieService.updateMovie(idMovie, {
      title: req.body.title,
      category: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director,
    });
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const idMovie = req.params.id;
    const response = await movieService.deleteMovie(req.params.id);
    const comments = await Comments.deleteMany({
      idMovie: idMovie,
    });
    return res.status(200).json({
      response,
      comments,
    });
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.post(`/:id/comments`, async (req, res) => {
  try {
    const idMovie = req.params.id;
    const response = await Comments.create({
      idMovie: idMovie,
      description: req.body.description,
    });
    return res.status(201).send(response);
  } catch (e) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Comments.find({ idMovie: req.params.id });
    return res.status(200).send(comments);
  } catch (e) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
