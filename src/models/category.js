const { mongoose } = require('../db');

const CategorySchema = new mongoose.Schema({
  title: String,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
