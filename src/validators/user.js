const { validate, mongoIdValidator } = require('../utils/middlewares/validate');

const createUserValidator = validate({
  email: {
    exists: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Invalid Email field' },
  },
  username: {
    exists: { errorMessage: 'Username is required' },
    isString: { errorMessage: 'Username should be a string' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be a string' },
  },
});

const userIdValidator = validate({
  userId: mongoIdValidator('userId'),
});

const authenticateUserValidator = validate({
  email: {
    exists: { errorMessage: 'Email is required' },
    isEmail: { errorMessage: 'Invalid Email field' },
  },
  password: {
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be a string' },
  },
});

module.exports = { createUserValidator, userIdValidator, authenticateUserValidator };
