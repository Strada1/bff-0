const Category = require('../models/Category.js');

const createCategory = ({ title }) => {
  return Category.create({ title });
};

module.exports = { createCategory };
