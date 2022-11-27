import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

export function createMovie({ title, year, duration, categories, directors }) {
  return Movie.create({ title, year, duration, categories, directors });
}

export function getMovie(id) {
  return Movie.findById(id).populate('comments categories directors');
}

export function getMovies({ filters, sort } = {}) {
  const movies = Movie.find().populate('comments categories directors');

  if (filters?.director) {
    movies.where('directors', filters.director);
  }

  if (filters?.category) {
    movies.where('categories', filters.category);
  }

  if (filters?.year) {
    movies.where('year', filters.year);
  }

  switch (sort) {
    case 'year':
      movies.sort({ year: 'asc' });
      break;
    case 'duration':
      movies.sort({ duration: -1 });
      break;
  }

  return movies;
}

export function updateMovie(id, { title, year, duration, categories, director }) {
  return Movie.findByIdAndUpdate(id, { title, year, duration, categories, director }, {
    new: true,
  });
}

export function deleteMovie(id) {
  return Movie.findByIdAndDelete(id);
}

export function getCountDirectorMovies(directorId) {
  return Movie.aggregate([
    {
      $match: { directors: new mongoose.Types.ObjectId(directorId) },
    },
    {
      $group: {
        _id: 'directors',
        requestsCount: {
          $sum: 1,
        },
      }
    },
  ]).exec();
}

export function getMoviesBetweenYears(minYear, maxYear) {
  return Movie.aggregate([
    {
      $match: { year: { $gte: +minYear, $lte: +maxYear } },
    },
    {
      $group: {
        _id: 'year',
        requestsCount: {
          $sum: 1,
        },
      },
    },
  ]);
}
