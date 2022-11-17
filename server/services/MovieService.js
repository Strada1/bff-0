const Movie = require('../models/Movie');

class MovieService {
  async getOne(id) {
    const movie = await Movie.findById(id);
    return movie;
  }

  async getAll() {
    const movies = await Movie.find();
    return movies;
  }

  async create(data) {
    const movie = await Movie.create(data);
    return movie;
  }

  async delete(id) {
    const result = await Movie.findByIdAndDelete(id);
    return result;
  }

  async update(id, data) {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
    });
    return movie;
  }
}

module.exports = new MovieService();
