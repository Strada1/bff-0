const { movieRouter } = require('./movie-routes');
const { categoryRouter } = require('./category-routes');
const { Router: Index } = require('express');

const router = Index();

router.use('movies', movieRouter);
router.use('categories', categoryRouter);

module.exports = { router };
