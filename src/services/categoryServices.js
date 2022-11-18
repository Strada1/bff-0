const Category = require('../models/Category.js');

const findAllCategories = () => {
  return Category.find().lean();
};

const findCategory = (id) => {
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
  findAllCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
