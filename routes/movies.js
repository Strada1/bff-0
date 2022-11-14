import express from 'express'
import Movie from '../models/movies.js'

const router = express.Router()
router.post('/', async (req, res) => {
  try {
    await Movie.create(req.body)
    return res.status(201).send('movie created')
  } catch (error) {
    console.log(error)
    return res.status(400).send("movie isn't create")
  }
})

export default router
