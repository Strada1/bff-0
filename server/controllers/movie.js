import NodeCache from 'node-cache';

import * as MovieService from '../services/movie.js';
import * as CommentService from '../services/comment.js';

const moviesCache = new NodeCache();

export async function createMovie(req, res) {
  try {
    const { title, year, duration, categories, directors } = req.body;
    const movie = await MovieService.createMovie({ title, year, duration, categories, directors });

    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getMovie(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await MovieService.getMovie(movieId);

    if (!movie) {
      return res.status(404).send('No movie for this ID');
    }

    return res.status(200).send(movie);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getMovies(req, res) {
  try {
    let movies;
    const isEmptyQueryParams = Object.values(req.query).length === 0;

    if (isEmptyQueryParams) {
      if (moviesCache.has('movies')) {
        console.log(moviesCache.getStats());
        return res.status(200).send( moviesCache.get('movies') );
      }

      movies = await MovieService.getMovies();
      moviesCache.set('movies', movies, 600)
    } else {
      const { director, category, year, sort } = req.query;
      const filters = { director, category, year };

      movies = await MovieService.getMovies({ filters, sort });
    }

    return res.status(200).send(movies);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateMovie(req, res) {
  try {
    const { movieId } = req.params;
    const updatedMovie = await MovieService.updateMovie(movieId, req.body);

    if (!updatedMovie) {
      return res.status(404).send('No movie for this ID');
    }

    return res.status(200).send(updatedMovie);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteMovie(req, res) {
  try {
    const { movieId } = req.params;
    const deletedMovie = await MovieService.deleteMovie(movieId);

    if (!deletedMovie) {
      return res.status(404).send('No movie for this ID');
    }

    const deletedCommentsCount = await CommentService.deleteComments(movieId);

    return res.status(200).send({ deletedMovie, deletedCommentsCount });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
