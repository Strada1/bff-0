const Category = require('../models/Category');

const getCategories = () => {
  return Category.find();
};

const createCategory = ({ category }) => {
  return Category.create({ category });
};

const updateCategory = (id, data) => {
  return Category.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteCategory = (id) => {
  return Category.findByIdAndDelete(id);
};

const findCategory = (category) => {
  return Category.findOne(category);
};

module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.findCategory = findCategory;
