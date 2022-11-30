const jwt = require('jsonwebtoken');

const createToken = (email, password) => {
  return jwt.sign({ email, password }, process.env.JWT_SECRET);
};

module.exports = { createToken };