const Categories = require('../models/categories.js');

const createCategory = ({ title }) => {
  return Categories.create({ title });
};

const showAllCategories = () => {
  return Categories.find({}).lean();
};

const updateCategory = (_id, { title }) => {
  return Categories.findByIdAndUpdate(
    _id,
    { title },
    {
      new: true,
    }
  );
};

const deliteCategory = ({ _id }) => {
  return Categories.findByIdAndDelete({ _id });
};

module.exports = {
  createCategory,
  showAllCategories,
  updateCategory,
  deliteCategory,
};
