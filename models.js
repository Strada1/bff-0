const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
  rating: Number,
});

const CategorySchema = new mongoose.Schema({
  title: String,
});

module.exports.movie = mongoose.model('Movie', MovieSchema);
module.exports.category = mongoose.model('Category', CategorySchema);
