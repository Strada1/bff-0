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
const { validationResult, param } = require('express-validator');
const validateParamId = require('../middlewares/validateParamId');
const { authUser, UserRoles } = require('../services/userServices');
const router = Router();

router.get('/', async (req, res) => {
  try {
    if (Object.keys(req.query).length) {
      const movies = await getMovies(req.query);
      return res.status(200).json(movies);
    }

    let movies = moviesCache.get(moviesCacheKeys.all);
    if (movies) {
      return res.status(200).json(movies);
    }
    movies = await getMovies(req.query);
    moviesCache.set(moviesCacheKeys.all, movies, 7200);
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .send('failed to get movies\nerror: ' + error.message);
  }
});

router.get('/:id', validateParamId(), async (req, res) => {
  const id = req.params.id;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
});

router.post(
  '/',
  validate(['title', 'category', 'year', 'director', 'duration']),
  async (req, res) => {
    try {
      const [email, password] = req.headers.authorization.split(' ');
      const user = await authUser({ email, password });
      if (!user || !user.roles.includes(UserRoles.user)) {
        return res.status(403).send('Not enough rights');
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const movie = await createMovie(req.body);

      return res.status(201).json(movie);
    } catch (error) {
      return res
        .status(500)
        .send('failed to create movie\nerror: ' + error.message);
    }
  }
);

router.delete('/:id', validateParamId(), async (req, res) => {
  try {
    const [email, password] = req.headers.authorization.split(' ');
    const user = await authUser({ email, password });
    if (!user || !user.roles.includes(UserRoles.admin)) {
      return res.status(403).send('Not enough rights');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
});

router.put('/:id', validateParamId(), async (req, res) => {
  try {
    const [email, password] = req.headers.authorization.split(' ');
    const user = await authUser({ email, password });
    if (!user || !user.roles.includes(UserRoles.admin)) {
      return res.status(403).send('Not enough rights');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const movie = await updateMovie(req.params.id, req.body);

    if (!movie) {
      return res.status(404).send(`Movie id:"${req.params.id}" - Not found`);
    }

    return res.status(200).send('movie updated successfully');
  } catch (error) {
    return res
      .status(500)
      .send('failed to update movie\nerror: ' + error.message);
  }
});

router.get(
  '/countBetweenYears/:start-:finish',
  param('start').isInt(),
  param('finish').isInt(),
  async (req, res) => {
    const { start, finish } = req.params;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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
