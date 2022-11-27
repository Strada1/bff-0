import express from 'express'
import fs from 'node:fs/promises'
import {validationResult} from 'express-validator'
import {
  getAllMovies,
  getMovie,
  getCountMovieByYear,
  getFilterMovie,
  getSortedMovie,
  createMovie,
  createMovies,
  updateMovie,
  deleteMovie
} from '../helpers/movies.js'
import {deleteAllComments} from '../helpers/comments.js'
import {validate, validateObj} from '../helpers/validate.js'
import {getCache, setCache, hasCache, deleteCache} from '../helpers/cache.js'

const router = express.Router()

const requiredKeys = [
  'title',
  'year',
  'rating',
  'category',
  'duration',
  'director'
]
const ttlCacheMovies = 3600

router
  .post('/', validate(requiredKeys), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      await createMovie(req.body)
      deleteCache('allMovies')
      return res.status(201).send('movie created')
    } catch (error) {
      return next(error)
    }
  })
  .post('/addMovieFromJSON', async (req, res, next) => {
    try {
      const arrMovie = []
      const file = await fs.readFile('movies.json', {encoding: 'utf-8'})
      const fileAfterParse = JSON.parse(file)

      fileAfterParse.forEach(i => {
        const isValidate = validateObj(i, requiredKeys)
        if (isValidate) arrMovie.push(i)
      })

      await createMovies(arrMovie)
      deleteCache('allMovies')
      res.status(201).send(arrMovie)
    } catch (error) {
      return next(error)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      let allMovies
      if (hasCache('allMovies')) {
        allMovies = getCache('allMovies')
      } else {
        allMovies = await getAllMovies()
        setCache('allMovies', allMovies, ttlCacheMovies)
      }
      return res.status(201).send(allMovies)
    } catch (error) {
      return next(error)
    }
  })
  .get('/count-movies', async (req, res, next) => {
    try {
      const query = req.query
      const movie = await getCountMovieByYear(query)
      return res.status(201).send(movie)
    } catch (error) {
      return next(error)
    }
  })
  .get('/filter', async (req, res, next) => {
    try {
      const query = req.query
      const filteredMovie = await getFilterMovie(query)
      return res.status(201).send(filteredMovie)
    } catch (error) {
      return next(error)
    }
  })
  .get('/sort', async (req, res, next) => {
    try {
      const sortName = req.query.sortName
      const sortedMovie = await getSortedMovie(sortName)
      return res.status(201).send(sortedMovie)
    } catch (error) {
      return next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      console.log(getCache('allMovies'))
      const id = req.params.id
      const movie = await getMovie(id)
      if (!movie) {
        return res.status(404).send('movie not found')
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
      deleteCache('allMovies')
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
      deleteCache('allMovies')
      return res.status(201).send('movie deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
