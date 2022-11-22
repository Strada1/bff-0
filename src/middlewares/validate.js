const { body } = require('express-validator');

const validate = (fields = []) => {
  return fields.map((field) => body(field, `${field} is empty`).notEmpty());
};

module.exports = validate;
