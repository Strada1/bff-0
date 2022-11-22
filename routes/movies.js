import express from 'express'
import {validationResult} from 'express-validator'
import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} from '../helpers/movies.js'
import {deleteAllComments} from '../helpers/comments.js'
import validate from '../helpers/validate.js'

const router = express.Router()

const requiredKeys = [
  'title',
  'year',
  'rating',
  'category',
  'duration',
  'director'
]

router
  .post('/', validate(requiredKeys), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      await createMovie(req.body)
      return res.status(201).send('movie created')
    } catch (error) {
      return next(error)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allMovies = await getAllMovies()
      return res.status(201).send(allMovies)
    } catch (error) {
      return next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const movie = await getMovie(id)
      if (!movie) {
        res.status(404).send('movie not found')
      }
      return res.status(201).send(movie)
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', validate(requiredKeys), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
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
