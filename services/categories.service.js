const Category = require('../models/categories.model');

const getCategory = () => {
  return Category.find().lean();
};
const createCategory = (category) => {
  return Category.create(category);
};

const updateCategory = (idCategory, category) => {
  return Category.findByIdAndUpdate(idCategory, category);
};

const deleteCategory = (idCategory) => {
  return Category.findByIdAndDelete(idCategory).lean();
};
module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
