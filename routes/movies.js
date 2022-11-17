import express from 'express'
import {
  createMovie,
  updateMovie,
  deleteMovie,
  deleteAllComments
} from '../helpers/services.js'

const router = express.Router()

router
  .post('/', async (req, res, next) => {
    try {
      await createMovie(req.body)
      return res.status(201).send('movie created')
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const updatedMovie = await updateMovie(id, req.body)
      if (!updatedMovie) {
        return res.status(404).send('movie not found')
      }
      return res.status(201).send('changed movie')
    } catch (error) {
      return next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const deletedMovie = await deleteMovie(id)
      if (!deletedMovie) {
        return res.status(404).send('movie not found')
      }
      deleteAllComments(deletedMovie.comments)
      return res.status(201).send('movie deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
