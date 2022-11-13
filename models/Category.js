const mongoose = require('../db.js');

const CategorySchema = mongoose.Schema({
  title: String,
});
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;