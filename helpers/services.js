import Movies from '../models/movies.js'
import Comments from '../models/comments.js'
import Category from '../models/categories.js'

export const createMovie = payload => {
  return Movies.create(payload)
}

export const updateMovie = (id, payload) => {
  return Movies.findByIdAndUpdate(id, payload)
}

export const deleteMovie = id => {
  return Movies.findByIdAndDelete(id)
}

export const findMovie = id => {
  return Movies.findById(id)
}

export const deleteComment = id => {
  return Comments.findByIdAndDelete(id)
}

export const deleteAllComments = comments => {
  return comments.forEach(async item => {
    item = item.toString()
    await Comments.findByIdAndDelete(item)
  })
}

export const createCategory = payload => {
  return Category.create(payload)
}

export const createComment = payload => {
  return Comments.create(payload)
}
