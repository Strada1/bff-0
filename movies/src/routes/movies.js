const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find()
        return res.status(200).send(movies)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get movies')
    }
})

router.post('/', async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        return res.status(201).send(movie)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create movie')
    }
})

router.delete('/:movieId', async (req, res) => {
    try {
        //
        console.log(req.params)
        return res.send(req.params)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not delete movie')
    }
})

router.patch('/:movieId', async (req, res) => {
    try {
        //
        console.log(req.params)
        return res.send(req.params)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not patch movie')
    }
})

module.exports = router
