const CategoryModel = require("../scheme/categoryScheme");

const createCategory = (body) => {
  return CategoryModel.create(body);
};

const findAllCategories = () => {
  return CategoryModel.find();
};

const updateMovie = (req) => {
  return CategoryModel.findByIdAndUpdate(req.params.id, req.body);
};

module.exports = { createCategory, findAllCategories, updateMovie };
