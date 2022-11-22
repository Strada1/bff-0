const Movie = require('../models/Movie');

class MovieService {
  getMovie(id) {
    return Movie.findById(id);
  }

  getMovies(filter) {
    if (filter) {
      return Movie.find(filter)
        .populate('categories')
        .populate('comments')
        .populate('director');
    }
    return Movie.find()
      .populate('categories')
      .populate('comments')
      .populate('director');
  }

  createMovie(data) {
    return Movie.create(data);
  }

  deleteMovie(id) {
    return Movie.findByIdAndDelete(id);
  }

  updateMovie(id, updatedFieldsMovie) {
    return Movie.findByIdAndUpdate(id, updatedFieldsMovie, {
      new: true,
    });
  }
}

module.exports = new MovieService();
