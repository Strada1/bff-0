const Movie = require('../models/Movie');

class MovieService {
  async getMovie(id) {
    return Movie.findById(id);
  }

  async getMovies(filter) {
    if (filter) {
      return Movie.find(filter);
    }
    return Movie.find();
  }

  async createMovie({ title, category, year, duration, director }) {
    return Movie.create({ title, category, year, duration, director });
  }

  async deleteMovie(id) {
    return Movie.findByIdAndDelete(id);
  }

  async updateMovie(id, updatedFieldsMovie) {
    return Movie.findByIdAndUpdate(id, updatedFieldsMovie, {
      new: true,
    });
  }

  async changeMovieAndSave(movie, callback) {
    callback(movie);
    movie.save();
  }
}

module.exports = new MovieService();
