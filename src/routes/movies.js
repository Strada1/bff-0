const Movie = require('../models/movie')
const { ROUTES } = require('../config');
const { Router } = require('express');
const movies = Router()

movies.post(ROUTES.MOVIE, async (req, res) => {
  try {
    await Movie.create(req.body)

    return res.status(201).send('movie created')
  } catch (error) {
    res.status(500).send('Bad request')
  }
})

movies.get(ROUTES.MOVIE, async (req, res) => {
  try {
    const allFilms = await Movie.find({});

    return res.status(200).send({
      movies: allFilms
    })
  } catch (error) {
    res.status(500).send('Bad request')
  }
})

module.exports = movies