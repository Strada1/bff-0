import Movie from '../models/Movie.js';
import Category from '../models/Category.js';

export async function createMovie({ title, year, duration }) {
  return Movie.create({ title, year, duration });
}

export function getMovie(id) {
  return Movie.findById(id).populate('comments categories');
}

export function getMovies() {
  return Movie.find().populate('comments categories');
}

export function updateMovie(id, { title, year, duration, categories, director }) {
  return Movie.findByIdAndUpdate(id, { title, year, duration, categories, director }, {
    new: true,
  });
}

export function deleteMovie(id) {
  return Movie.findByIdAndDelete(id);
}