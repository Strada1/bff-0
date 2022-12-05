const express = require('express');
const {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie
} = require('../services/movieService');
const { validate, checkIsAdmin } = require('../middlewares');
const { validationResult, body, param } = require('express-validator');
const NodeCache = require('node-cache');
const passport = require('passport');

const router = express.Router();

const oneHour = 3600;

const movieCache = new NodeCache({ stdTTL: oneHour });

const fieldValidators = [
  body('title').matches(/[a-zA-Zа-яА-Я0-9]/).trim().optional().withMessage('title must contain only letters or numbers'),
  body('year').isInt().optional().withMessage('year must be int'),
  body('director').isMongoId().optional().withMessage('director must be MongoId')
];

const paramValidator = param('movieId').isMongoId().withMessage('movieId must be MongoId');

router.get('/movies',
  // passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    try {

      const hasQueryParams = Object.keys(req.query).length > 0;
      const hasCache = movieCache.has('movies');

      if (hasQueryParams) {
        const movies = await getMovies(req.query);
        return res.status(200).send(movies);
      }

      if (hasCache) {
        return res.status(200).send(movieCache.get('movies'));
      }

      const movies = await getMovies(req.query);
      movieCache.set('movies', movies);
      return res.status(200).send(movies);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not get movies');
    }
  });

router.get('/movies/:movieId',
  // passport.authenticate('bearer', { session: false }),
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const movie = await getMovie(req.params.movieId);
      return res.status(200).send(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not get movie');
    }
  });

router.post('/movies',
  validate(['title', 'year']),
  // passport.authenticate('bearer', { session: false }),
  // checkIsAdmin,
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      movieCache.del('movies');
      const movie = await createMovie(req.body);
      return res.status(201).send(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not create movie');
    }
  });

router.delete('/movies/:movieId',
  passport.authenticate('bearer', { session: false }),
  checkIsAdmin,
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      movieCache.del('movies');
      const movie = await deleteMovie(req.params.movieId);
      return res.status(200).send(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not delete movie');
    }
  });

router.patch('/movies/:movieId',
  // passport.authenticate('bearer', { session: false }),
  // checkIsAdmin,
  paramValidator,
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { movieId } = req.params;
      movieCache.del('movies');
      const movie = await updateMovie(movieId, req.body);
      return res.status(200).send(movie);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not patch movie');
    }
  }
);

module.exports = router;
