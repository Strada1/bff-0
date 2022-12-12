import { Router } from 'express';
import {
  createMovie,
  getMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMoviesBetweenYears,
  getCountDirectorMovies,
} from '../services/movie.js';
import { deleteComments } from '../services/comment.js';

import { authorization, ROLES } from '../middlewares/passport.js';
import Cache from '../services/cache.js';
import ApiError from '../exceptions/apiError.js';

const router = new Router();
const moviesCache = new Cache();

router.post('/',
  async (req, res, next) => {
  try {
    const { title, year, duration, categories, directors } = req.body;
    const movie = await createMovie({ title, year, duration, categories, directors });

    return res.status(201).send(movie);
  } catch (err) {
    next(err);
  }
});

router.get('/:movieId', async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await getMovie(movieId);

    if (!movie) {
      return next( ApiError.NotFound('No movie for this ID') );
    }

    return res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
});

router.get('/',
  async (req, res, next) => {
    try {
      const hasQueryParams = Object.keys(req.query).length !== 0;

      if (hasQueryParams) {
        const { director, category, year, sort } = req.query;
        const filters = { director, category, year };

        const movies = await getMovies({ filters, sort });
        return res.status(200).send(movies);
      }

      if (moviesCache.check('movies')) {
        return res.status(200).send(moviesCache.get('movies'));
      }

      const movies = await getMovies();
      moviesCache.set('movies', movies);

      return res.status(200).send(movies);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:movieId',
  // authorization([ROLES.MODERATOR]),
  async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const updatedMovie = await updateMovie(movieId, req.body);

      if (!updatedMovie) {
        return next( ApiError.NotFound('No movie for this ID') );
      }

      return res.status(200).send(updatedMovie);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:movieId',
  authorization([ROLES.MODERATOR]),
  async (req, res, next) => {
    try {
      const { movieId } = req.params;
      const deletedMovie = await deleteMovie(movieId);

      if (!deletedMovie) {
        return next( ApiError.NotFound('No movie for this ID') );
      }

      const deletedCommentsCount = await deleteComments(movieId);

      return res.status(200).send({ deletedMovie, deletedCommentsCount });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/aggregation/directors/:directorId', async (req, res, next) => {
  try {
    const { directorId } = req.params;
    const result = await getCountDirectorMovies(directorId);

    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

router.get('/aggregation/years', async (req, res, next) => {
  try {
    const { minYear, maxYear } = req.query;
    const result = await getMoviesBetweenYears(minYear, maxYear);

    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

export default router;