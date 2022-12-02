const { categoryController } = require('../controllers');
const { Router } = require('express');
const { createCategoryValidator, categoryIdValidator, updateCategoryValidator } = require('../validators/category');

const categoryRouter = Router();

categoryRouter.post('/', createCategoryValidator, categoryController.create);
categoryRouter.get('/', categoryController.get);
categoryRouter.get('/:categoryId', categoryIdValidator, categoryController.getOne);
categoryRouter.put('/:categoryId', updateCategoryValidator, categoryController.update);
categoryRouter.delete('/:categoryId', categoryIdValidator, categoryController.delete);

module.exports = { categoryRouter };
