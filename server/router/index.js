const router = require('express').Router();

const { Movie, Category, Comment } = require('../models/');
const { MovieService, CategoryService, CommentService } = require('../services/');
const { getGeneratedResponse } = require('../utils/');

router.get('/movies', async (req, res) => {
  try {
    const movies = await MovieService.getMovies();

    return res.status(200).send(
      getGeneratedResponse(true, movies)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/movies', async (req, res) => {
  try {
    const movie = await MovieService.createMovie(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, movie)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.delete('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await MovieService.deleteMovie(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    let deleteCountComments = 0;
    if (movie.comments.length > 0) {
      deleteCountComments = await CommentService.deleteAllCommentByIdFilm(movieId);
    }

    return res.status(200).send(
      getGeneratedResponse(true, movie, { deleteCountComments })
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await MovieService.updateMovie(movieId, req.body);

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
});

router.post('/categories', async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);

    return res.status(201).send(
      getGeneratedResponse(true, category)
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

router.post('/movies/:movieId/comments', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await MovieService.getMovie(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    const comment = await CommentService.createComment({ movieId, ...req.body });

    await MovieService.changeMovieAndSave(movie, () => {
      movie.comments.push(comment._id);
    });

    return res.status(201).send(
      getGeneratedResponse(true, comment, { movie })
    );
  } catch (err) {
    console.log('Error: ', err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
