const { movieController } = require('../controllers');
const { Router } = require('express');

const movieRouter = Router();

movieRouter.post('/', movieController.create);
movieRouter.get('/:movieId', movieController.get);
movieRouter.put('/:movieId', movieController.update);
movieRouter.delete('/:movieId', movieController.delete);

module.exports = { movieRouter };
