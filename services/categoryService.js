const CategoryModel = require("../scheme/categoryScheme");

const createCategory = async (body) => {
  await CategoryModel.create(body);
};

const findAllCategories = () => {
  return CategoryModel.find();
};

module.exports = { createCategory, findAllCategories };
