const Category = require('../models/Category');

function createCategory({ category }) {
  return Category.create({ category });
}

module.exports = {
  createCategory,
};
