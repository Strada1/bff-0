const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: String,
});

module.exports = mongoose.model('Category', CategorySchema);
