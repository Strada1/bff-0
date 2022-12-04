const { Router } = require('express');
const { movieRouter } = require('./movie');
const { categoryRouter } = require('./category');
const { directorRouter } = require('./director');
const { userRouter } = require('./user');
const { authMiddleware } = require('../utils/middlewares/authMiddleware');

const router = Router();

router.use('/movies', authMiddleware, movieRouter);
router.use('/categories', categoryRouter);
router.use('/directors', directorRouter);
router.use('/users', userRouter);

module.exports = { router };
