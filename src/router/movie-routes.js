const { movieController } = require('../controllers');
const { Router } = require('express');

const movieRouter = Router();

movieRouter.post('/', movieController.create);
movieRouter.get('/:movieId', movieController.get);
movieRouter.put('/:movieId', movieController.update);
movieRouter.delete('/:movieId', movieController.delete);
movieRouter.post('/:movieId/comments',movieController.addComment);
movieRouter.delete('/:movieId/comments/:commentId',movieController.deleteComment);

module.exports = { movieRouter };
