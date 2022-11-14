const express = require('express');
const router = express.Router();
const Movie = require('../models/movies.model');

router.post('/', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await Movie.collection.find().toArray();
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
