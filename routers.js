const express = require('express');
const Models = require('./models.js');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    return res.status(200).send('Hello world');
  } catch (e) {
    return res.status(500).send('bad request');
  }
});

router.post('/movies', async (req, res) => {
  try {
    const movie = await Models.movie.create(req.body);
    res.status(201).send('movie adding');
  } catch (e) {
    return res.status(500).send('bad request');
  }
});

router.post('/categories', async (req, res) => {
  try {
    const categories = Models.categories.create(req.body);
    return res.status(201).send('categories adding');
  } catch (e) {
    return res.status(500).send('bad request');
  }
});

module.exports = router;
