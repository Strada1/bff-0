const express = require('express')
const Movie = require('../models/Movie')

const movies = express.Router()

movies.get('/', async (req, res) => {
    try {
        const response = await Movie.collection.find().toArray()
        return res.status(200).send(response)
    } catch (e) {
        console.log(e)
        return res.status(500).send('bad request')
    }
})

movies.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        return res.status(201).send(movie)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create movie')
    }
})

module.exports = movies
