const Category = require('../models/Category.js');

const getCategories = () => {
  return Category.find().lean();
};

const getCategory = (id) => {
  return Category.findById(id).lean();
};

const createCategory = ({ title }) => {
  return Category.create({ title });
};

const updateCategory = (id, { title }) => {
  return Category.findByIdAndUpdate(id, { title });
};

const deleteCategory = (id) => {
  return Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
