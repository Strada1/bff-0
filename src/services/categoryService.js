const Category = require('../models/categoryModel');

const CATEGORY = {
  GET: (id, callback) => {
    Category.findById(id, callback);
  },
  DELETE: (id) => {
    return Category.findByIdAndDelete(id);
  },
  CREATE: ({ title }) => {
    return Category.create({ title });
  },
  UPDATE: (id, update) => {
    return Category.findByIdAndUpdate(id);
  },
};

module.exports.CATEGORY = CATEGORY;
