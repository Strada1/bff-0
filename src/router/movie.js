const { movieController } = require('../controllers');
const { Router } = require('express');

const movieRouter = Router();

movieRouter.post('/', movieController.create);
movieRouter.get('/', movieController.get);
movieRouter.get('/:movieId', movieController.getOne);
movieRouter.put('/:movieId', movieController.update);
movieRouter.delete('/:movieId', movieController.delete);
movieRouter.post('/:movieId/comments', movieController.addComment);
movieRouter.put('/comments/:commentId', movieController.updateComment);
movieRouter.delete('/:movieId/comments/:commentId', movieController.deleteComment);

module.exports = { movieRouter };
