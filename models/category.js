const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('Category', CategorySchema);
