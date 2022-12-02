const { validate, mongoIdValidator } = require('../utils/middlewares/validate');


const createCategoryValidator = validate({
  title: {
    exists: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Title should be a string' },
  },
});

const categoryIdValidator = validate({
  categoryId: mongoIdValidator('categoryId'),
});

const updateCategoryValidator = validate({
  categoryId: mongoIdValidator('categoryId'),
  title: {
    optional: {},
    isString: { errorMessage: 'Title should be a string' },
  },
});

module.exports = { createCategoryValidator, categoryIdValidator, updateCategoryValidator };
