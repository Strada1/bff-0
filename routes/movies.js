import express from 'express'
import Movies from '../models/movies.js'
import Comments from '../models/comments.js'

const router = express.Router()

router
  .post('/', async (req, res, next) => {
    try {
      await Movies.create(req.body)
      return res.status(201).send('movie created')
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const updatedMovie = await Movies.findByIdAndUpdate(id, req.body)
      if (!updatedMovie) {
        return res.status(403).send('movie not found')
      }
      return res.status(201).send('changed movie')
    } catch (error) {
      return next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const deletedMovie = await Movies.findByIdAndDelete(id)
      if (!deletedMovie) {
        return res.status(403).send('movie not found')
      }
      deletedMovie.comments
        .map(item => item.toString())
        .forEach(async commentId => {
          await Comments.findByIdAndDelete(commentId)
        })
      return res.status(201).send('movie deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
