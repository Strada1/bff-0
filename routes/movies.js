const express = require('express');
const router = express.Router();
const {
  createMovie,
  showAllMovies,
  updateMovie,
  deliteMovie,
} = require('../services/movieService.js');

router.get('/all', async (req, res) => {
  try {
    const data = await showAllMovies();
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await createMovie(req.body);
    return res.status(201).send('Movie adding');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await updateMovie(req.body._id, req.body);
    return res.status(201).send('Movie updated');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deliteMovie(req.body);
    return res.status(201).send('Movie removed');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
