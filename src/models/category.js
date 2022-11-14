const { Schema, model } = require('../db');

const CategorySchema = new Schema({
  category: String,
})

const Category = model('Category', CategorySchema);

module.exports = Category;
