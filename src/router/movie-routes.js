const { movieController } = require('../controllers');
const { Router } = require('express');

const movieRouter = Router();

movieRouter.get('/', movieController.get);
movieRouter.post('/', movieController.create);
movieRouter.delete('/', ( req, res ) => {
  return res.status(201).send('Movie deleted successfully');
});
movieRouter.put('/', ( req, res ) => {
  return res.status(201).send('Movie changed successfully');
});

module.exports = { movieRouter };
