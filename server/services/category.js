import Category from '../models/Category.js';
import Movie from '../models/Movie.js';

export function createCategory(title) {
  return Category.create({ title });
}

export function getCategory(id) {
  return Category.findById(id);
}

export async function getCategories(movieId) {
  if (movieId) {
    const movie = await Movie.findById(movieId);
    return Category.find({ _id: movie.categories });
  }
  return Category.find();
}

export function updateCategory(id, title) {
  return Category.findByIdAndUpdate(id, { title }, {
    new: true,
  });
}

export function deleteCategory(id) {
  return Category.findByIdAndDelete(id);
}

export function addCategory(categoryId, movieId) {
  return Movie.findByIdAndUpdate(movieId, {
    $push: { categories: categoryId },
  });
}

export function pullCategory(categoryId, movieId) {
  return Movie.findByIdAndUpdate(movieId, {
    $pull: { categories: categoryId },
  });
}

export function pullCategories(categoryId) {
  return Movie.updateMany({}, {
    $pull: { categories: categoryId },
  });
}
