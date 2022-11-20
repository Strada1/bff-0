const { categoryController } = require('../controllers');
const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.get);
categoryRouter.get('/:categoryId', categoryController.getOne);
categoryRouter.put('/:categoryId', categoryController.update);
categoryRouter.delete('/:categoryId', categoryController.delete);

module.exports = { categoryRouter };
