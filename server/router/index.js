const router = require('express').Router();

const { Movie, Category } = require('../models/');

router.use((req, res, next) => {
  console.log('Rout params: ', req.params);
  next();
});

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).send(movies);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body); // создаем новый документ для модели Movie
    return res.status(201).send(movie);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send(err.message);
  }
});

router.delete('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    return res.status(200).send(movieId);
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    return res.status(200).send(movieId);
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).send(category);
  } catch (err) {
    console.log('Error:', err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
