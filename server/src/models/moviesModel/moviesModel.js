const mongoose = require('mongoose');
const definitionMovieScheme = require('../../scheme/movieScheme/movieScheme');

const MovieSchema = new mongoose.Schema(definitionMovieScheme);

const Movie = mongoose.model('Movie', MovieSchema);

const movie = Movie.create({
  title: 'Matrix',
  year: '2022',
  rating: 6.4,
  duration: 7200,
});

module.exports = movie;
