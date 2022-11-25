import Director from '../models/director.js'
import Movies from '../models/movies.js'
import db from '../ext/db.js'

const createDirector = payload => {
  return Director.create(payload)
}

const getAllDirector = () => {
  return Director.find().lean()
}

const getMoviesCountByDirector = id => {
  return Movies.aggregate([
    {$match: {director: db.Types.ObjectId(id)}},
    {
      $group: {
        _id: '$director',
        moviesCount: {
          $sum: 1
        }
      }
    }
  ])
}

const updateDirector = (id, payload) => {
  return Director.findByIdAndUpdate(id, payload)
}

const deleteDirector = id => {
  return Director.findByIdAndDelete(id)
}

export {
  createDirector,
  getAllDirector,
  getMoviesCountByDirector,
  updateDirector,
  deleteDirector
}
