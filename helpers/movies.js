import Movies from '../models/movies.js'

const getAllMovies = () => {
  return Movies.find().lean().populate(['category', 'comments', 'director'])
}

const getMovie = id => {
  return Movies.findById(id)
    .lean()
    .populate(['category', 'comments', 'director'])
}

const getCountMovieByYear = (from, to) => {
  return Movies.aggregate([
    {
      $match: {
        $and: [{year: {$lt: to}}, {year: {$gt: from}}]
      }
    },
    {$count: `number of films from ${from} to ${to}`}
  ])
}

const createMovie = payload => {
  return Movies.create(payload)
}

const createMovies = payload => {
  return Movies.insertMany(payload)
}

const updateMovie = (id, payload) => {
  return Movies.findByIdAndUpdate(id, payload)
}

const deleteMovie = id => {
  return Movies.findByIdAndDelete(id)
}

const findMovie = id => {
  return Movies.findById(id)
}

export {
  getAllMovies,
  getMovie,
  getCountMovieByYear,
  createMovie,
  createMovies,
  updateMovie,
  deleteMovie,
  findMovie
}
