const Movie = require('../models/movieModel');

const MOVIE = {
  GET: (id, callback) => {
    Movie.findById(id, callback).populate(['category', 'directorId']);
  },
  CREATE: (movieObject) => {
    return Movie.create(movieObject);
  },
  UPDATE: (id, update) => {
    return Movie.findByIdAndUpdate(id, update);
  },
  DELETE: (id) => {
    return Movie.findByIdAndDelete(id);
  },
};

module.exports.MOVIE = MOVIE;
