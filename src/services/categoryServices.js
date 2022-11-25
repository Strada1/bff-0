const Category = require('../models/Category.js');

const getCategories = ({ sort, asc = 1 }) => {
  const categories = Category.find().lean();
  if (sort) {
    categories.sort({ [sort]: asc });
  }
  return categories;
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
