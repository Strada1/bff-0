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
        await Movie.create(req.body)
        return res.status(201).send('successfully created')
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create movie')
    }
})

router.delete('/:movieId', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieId)
        return res.status(200).send('successfully deleted')
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not delete movie')
    }
})

router.patch('/:movieId', async (req, res) => {
    try {
        const id = { _id: req.params.movieId }
        await Movie.findByIdAndUpdate(id, req.body)
        return res.status(200).send('successfully updated')
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not patch movie')
    }
})

router.post('/:movieId/comments', async (req, res) => {
    try {
        const id = { _id: req.params.movieId }
        await Movie.updateOne(id, { $push: { comments: req.body.comment } })
        return res.status(201).send('comment added successfully')
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not add comment')
    }
})

module.exports = router
