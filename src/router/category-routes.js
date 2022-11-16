const { categoryController } = require('../controllers');
const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.post('/', categoryController.create);

module.exports = { categoryRouter };
