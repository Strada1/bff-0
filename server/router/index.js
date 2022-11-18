const router = require('express').Router();

const {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  changeMovieAndSave
} = require('../services/MovieServices');
const { createCategory } = require('../services/CategoryServices');
const { createComment, deleteAllCommentByIdFilm } = require('../services/CommentServices');

const { getGeneratedResponse } = require('../utils/');

router.get('/movies', async (req, res) => {
  try {
    const movies = await getMovies();

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
    const movie = await createMovie(req.body);

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
});

router.put('/movies/:movieId', async (req, res) => {
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
});

router.post('/categories', async (req, res) => {
  try {
    const category = await createCategory(req.body);

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
    const movie = await getMovie(movieId);

    if (!movie) {
      return res.status(404).send(
        getGeneratedResponse(false, movie, {
          message: 'No document for this id'
        })
      );
    }

    const comment = await createComment({ movieId, ...req.body });

    await changeMovieAndSave(movie, () => {
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
