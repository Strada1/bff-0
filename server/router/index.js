const router = require('express').Router();

const {
  getMoviesHandler,
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
} = require('../handlers/movieHandlers');
const { createCategoryHandler } = require('../handlers/categoryHandlers');
const { addCommentHandler } = require('../handlers/commentHandlers');

router.get('/movies', getMoviesHandler);
router.post('/movies', createMovieHandler);
router.delete('/movies/:movieId', deleteMovieHandler);
router.put('/movies/:movieId', updateMovieHandler);
router.post('/categories', createCategoryHandler);
router.post('/movies/:movieId/comments', addCommentHandler);

module.exports = router;
