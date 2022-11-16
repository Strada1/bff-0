const { movieRouter } = require('./movie-routes');
const { categoryRouter } = require('./category-routes');
const { Router } = require('express');

const router = Router();

router.use('/movies', movieRouter);
router.use('/categories', categoryRouter);

module.exports = { router };
