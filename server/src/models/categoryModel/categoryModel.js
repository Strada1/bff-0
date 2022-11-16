const mongoose = require('mongoose');
const definitionCategoryScheme = require('../../scheme/categoryScheme/categoryScheme');

const CategorySchema = new mongoose.Schema(definitionCategoryScheme);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
