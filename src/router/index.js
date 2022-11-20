const { Router } = require('express');
const { movieRouter } = require('./movie');
const { categoryRouter } = require('./category');
const { directorRouter } = require('./director');

const router = Router();

router.use('/movies', movieRouter);
router.use('/categories', categoryRouter);
router.use('/directors', directorRouter);

module.exports = { router };
