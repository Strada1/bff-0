import Category from '../models/Category.js';
import Movie from '../models/Movie.js';

export function createCategory(title) {
  return Category.create({ title });
}

export function getCategory(id) {
  return Category.findById(id);
}

export async function getCategories(sort) {
  const categories = Category.find();

  switch (sort) {
    case 'asc':
      categories.sort({ title: 'asc' });
      break;
    case '-1':
      categories.sort({ title: -1 });
      break;
  }

  return categories;
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
