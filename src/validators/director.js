const { validate, mongoIdValidator } = require('../utils/middlewares/validate');

const createDirectorValidator = validate({
  title: {
    exists: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Title should be a string' },
  },
  name: {
    exists: { errorMessage: 'Name is required' },
    isMongoId: { errorMessage: 'Category should be a mongoId' },
  },
  surname: {
    exists: { errorMessage: 'Surname is required' },
    isNumeric: { errorMessage: 'Year should be a number' },
  },
});

const directorIdValidator = validate({
  directorId: mongoIdValidator('directorId'),
});

const updateDirectorValidator = validate({
  directorId: mongoIdValidator('directorId'),
  title: {
    optional: {},
    isString: { errorMessage: 'Title should be a string' },
  },
  name: {
    optional: {},
    isMongoId: { errorMessage: 'Name should be a mongoId' },
  },
  surname: {
    optional: {},
    isNumeric: { errorMessage: 'Surname should be a number' },
  },
});

module.exports = { createDirectorValidator, directorIdValidator, updateDirectorValidator };
