const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

const CategoriesSchema = new mongoose.Schema({ title: String });
const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports.movie = Movie;
module.exports.categories = Categories;
