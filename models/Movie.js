const mongoose = require('../db.js');

const MovieSchema = mongoose.Schema({
  title: String,
  category: String,
  year: Number,
  duration: Number,
  director: String,
});
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;