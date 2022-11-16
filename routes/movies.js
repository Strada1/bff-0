import express from 'express'
import Movie from '../models/movies.js'

const router = express.Router()
router
  .post('/', async (req, res) => {
    try {
      await Movie.create(req.body)
      return res.status(201).send('movie created')
    } catch (error) {
      console.log(error)
      return res.status(400).send("movie didn't create")
    }
  })
  .put('/', async (req, res) => {
    try {
      return res.status(201).send('changed movie')
    } catch (error) {
      console.log(error)
      return res.status(500).send('bad request')
    }
  })
  .delete('/', async (req, res) => {
    try {
      return res.status(201).send('movie deleted')
    } catch (error) {
      console.log(error)
      return res.status(500).send('bad request')
    }
  })

export default router
