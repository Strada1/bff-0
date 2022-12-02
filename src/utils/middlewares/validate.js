const { checkSchema, validationResult } = require('express-validator');

const checkValidatorError = ( req, res, next ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const mongoIdValidator = ( paramName ) => {
  return {
    isMongoId: {
      errorMessage: `${paramName} should be a mongoId`,
    },
  };
};

const validate = ( validatorSchema ) => {
  return [ checkSchema(validatorSchema), checkValidatorError ];
};


module.exports = { validate, mongoIdValidator, checkValidatorError };
