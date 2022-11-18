const {
  getMovies,
  createMovie,
  deleteMovie,
  updateMovie,
} = require('../services/movieServices');
const { deleteAllCommentByIdFilm } = require('../services/commentServices');
const { getGeneratedResponse } = require('../utils');

async function getMoviesHandler(req, res) {
  try {
    const movies = await getMovies();

    return res.status(200).send(
      getGeneratedResponse(true, movies)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function createMovieHandler(req, res) {
  try {
    const movie = await createMovie(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, movie)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function deleteMovieHandler(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await deleteMovie(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    let deleteCountComments = 0;
    if (movie.comments.length > 0) {
      deleteCountComments = await deleteAllCommentByIdFilm(movieId);
    }

    return res.status(200).send(
      getGeneratedResponse(true, movie, { deleteCountComments })
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

async function updateMovieHandler(req, res) {
  try {
    const { movieId } = req.params;
    const movie = await updateMovie(movieId, req.body);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id',
        })
      );
    }

    return res.status(200).send(
      getGeneratedResponse(true, movie)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
}

module.exports = {
  getMoviesHandler,
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
};
