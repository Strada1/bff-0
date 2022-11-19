const Category = require('../models/category');

module.exports.createCategory = function ({ title }) {
  return Category.create({ title });
};

module.exports.getCategory = function (categoryId) {
  return Category.findById(categoryId);
};

module.exports.updateCategory = function (categoryId, reqBody) {
  return Category.findByIdAndUpdate(categoryId, reqBody);
};

module.exports.deleteCategory = function (categoryId) {
  return Category.findByIdAndDelete(categoryId);
};
