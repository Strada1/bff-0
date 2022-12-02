const { movieController } = require('../controllers');
const { Router } = require('express');
const {
  updateMovieValidator,
  createMovieValidator,
  createCommentValidator,
  updateCommentValidator,
  movieIdValidator,
  commentIdValidator,
} = require('../validators/movie');

const movieRouter = Router();


movieRouter.post('/', createMovieValidator, movieController.create);
movieRouter.get('/', movieController.get);
movieRouter.get('/:movieId', movieIdValidator, movieController.getOne);
movieRouter.put('/:movieId', updateMovieValidator, movieController.update);
movieRouter.delete('/:movieId', movieIdValidator, movieController.delete);
movieRouter.post('/:movieId/comments', createCommentValidator, movieController.addComment);
movieRouter.put('/comments/:commentId', updateCommentValidator, movieController.updateComment);
movieRouter.delete('/:movieId/comments/:commentId', commentIdValidator, movieController.deleteComment);

module.exports = { movieRouter };
