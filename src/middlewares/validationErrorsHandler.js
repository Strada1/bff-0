const { validationResult } = require('express-validator');

const validationErrorsHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
    res.status(500).send('Internal Server Error\nerror: ' + error.message);
  }
};

module.exports = {
  validationErrorsHandler,
};