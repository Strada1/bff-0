const { body } = require('express-validator');

const sanitize = (fields) => {
  return fields.map((field) => body(field).trim().escape());
};

module.exports.sanitize = sanitize;
