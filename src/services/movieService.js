const Movie = require('../models/movieModel');

const MOVIE = {
  CREATE: (movieObject) => {
    return Movie.create(movieObject);
  },
  UPDATE: (id) => {
    return Movie.findByIdAndUpdate(id);
  },
  DELETE: (id) => {
    return Movie.findByIdAndDelete(id);
  },
};

module.exports.MOVIE = MOVIE;
