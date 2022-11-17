const Category = require('../models/categoryModel');

const CATEGORY = {
  DELETE: (id) => {
    return Category.findByIdAndDelete(id);
  },
  CREATE: ({ title }) => {
    return Category.create({ title });
  },
  UPDATE: (id) => {
    return Category.findByIdAndUpdate(id);
  },
};

module.exports.CATEGORY = CATEGORY;
