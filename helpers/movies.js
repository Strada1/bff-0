import Movies from '../models/movies.js'
import db from '../ext/db.js'

const normalizeParams = params => {
  if (params.from !== undefined) params.from = Number(params.from)
  if (params.to !== undefined) params.to = Number(params.to)
  if (params.year !== undefined) params.year = Number(params.year)
  if (params.rating !== undefined) params.rating = Number(params.rating)
  if (params.duration !== undefined) params.duration = Number(params.duration)
  if (params.director !== undefined)
    params.director = db.Types.ObjectId(params.director)
  if (params.category !== undefined)
    params.category = db.Types.ObjectId(params.category)

  return params
}
const getAllMovies = () => {
  return Movies.find().lean().populate(['category', 'comments', 'director'])
}

const getMovie = id => {
  return Movies.findById(id)
    .lean()
    .populate(['category', 'comments', 'director'])
}

const getCountMovieByYear = params => {
  const normalParams = normalizeParams(params)
  return Movies.aggregate([
    {
      $match: {year: {$lte: normalParams.to, $gte: normalParams.from}}
    },
    {$count: `number of films from ${normalParams.from} to ${normalParams.to}`}
  ])
}

const getFilterMovie = params => {
  const normalParams = normalizeParams(params)
  return Movies.aggregate([{$match: normalParams}])
}

const getSortedMovie = sortName => {
  return Movies.aggregate([
    {
      $sort: {[sortName]: 1}
    }
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
  getFilterMovie,
  getSortedMovie,
  createMovie,
  createMovies,
  updateMovie,
  deleteMovie,
  findMovie
}
