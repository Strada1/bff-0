const { Router } = require('express');
const {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie,
  getMovies,
  countMoviesBetweenYears,
  moviesCache,
  moviesCacheKeys,
} = require('../services/movieServices');
const { deleteAllMovieComments } = require('../services/commentServices');
const validate = require('../middlewares/validate');
const { param, body } = require('express-validator');
const validateParamId = require('../middlewares/validateParamId');
// const { checkAuth } = require('../middlewares/checkAuth');
// const { UserRoles } = require('../services/userServices');
const {
  validationErrorsHandler,
} = require('../middlewares/validationErrorsHandler');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const twoHours = 7200;
    const hasQuery = Object.keys(req.query).length;

    if (hasQuery) {
      const movies = await getMovies(req.query);
      return res.status(200).json(movies);
    }

    let movies = moviesCache.get(moviesCacheKeys.all);
    if (movies) {
      return res.status(200).json(movies);
    }
    movies = await getMovies();
    moviesCache.set(moviesCacheKeys.all, movies, twoHours);
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .send('failed to get movies\nerror: ' + error.message);
  }
});

router.get(
  '/:id',
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    const id = req.params.id;

    try {
      const movie = await getMovie(id);
      if (!movie) {
        return res.status(404).send(`Movie id:${id} - not found`);
      }
      return res.status(200).json(movie);
    } catch (error) {
      return res
        .status(500)
        .send(`failed to get movie ${id}\nerror: ` + error.message);
    }
  }
);

router.post(
  '/',
  // checkAuth(),
  validate(['title', 'category', 'year', 'director', 'duration']),
  body('title', 'Should be string').isString(),
  body('duration', 'Should be integer').isInt(),
  body('year', 'Should be date').isDate(),
  body('director', 'Should be ObjectId').isMongoId(),
  body('category', 'Should be ObjectId').isMongoId(),
  body('description', 'Should be string').isString().optional(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const movie = await createMovie(req.body);

      return res.status(201).json(movie);
    } catch (error) {
      return res
        .status(500)
        .send('failed to create movie\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id',
  // checkAuth([UserRoles.admin]),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const deleted = await deleteMovie(req.params.id);
      if (!deleted) {
        return res.status(404).send('movie not found');
      }
      await deleteAllMovieComments(deleted._id);

      return res.status(200).send('movie deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete movie\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  // checkAuth(),
  validateParamId(),
  body('title', 'Should be string').isString().isLength({min: 1}).optional(),
  body('duration', 'Should be integer').isInt().optional(),
  body('year', 'Should be date').isDate().optional(),
  body('director', 'Should be ObjectId').isMongoId().optional(),
  body('category', 'Should be ObjectId').isMongoId().optional(),
  body('description', 'Should be string').isString().optional(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const movie = await updateMovie(req.params.id, req.body);

      if (!movie) {
        return res.status(404).send(`Movie id:"${req.params.id}" - Not found`);
      }

      return res.status(200).json(movie);
    } catch (error) {
      return res
        .status(500)
        .send('failed to update movie\nerror: ' + error.message);
    }
  }
);

router.get(
  '/countBetweenYears/:start-:finish',
  param('start').isInt(),
  param('finish').isInt(),
  validationErrorsHandler,
  async (req, res) => {
    const { start, finish } = req.params;
    try {
      const counter = await countMoviesBetweenYears(start, finish);
      return res.status(200).json(counter);
    } catch (error) {
      return res
        .status(500)
        .send(
          `failed to count movies between ${start} and ${finish} \nerror: ${error.message}`
        );
    }
  }
);

module.exports = router;
