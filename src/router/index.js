const { movieRouter } = require('./movie');
const { categoryRouter } = require('./category');
const { Router } = require('express');

const router = Router();

router.use('/movies', movieRouter);
router.use('/categories', categoryRouter);

module.exports = { router };
