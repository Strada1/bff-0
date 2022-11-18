const express = require('express')
const {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    addCommentToMovie,
} = require('../services/movieService')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const movies = await getMovies()
        return res.status(200).send(movies)
    } catch (e) {
        return res.status(500).send('can not get movies')
    }
})

router.post('/', async (req, res) => {
    try {
        const movie = await createMovie(req.body)
        return res.status(201).send(`successfully created: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not create movie')
    }
})

router.delete('/:movieId', async (req, res) => {
    try {
        const movie = await deleteMovie(req.params.movieId)
        return res.status(200).send(`successfully deleted: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not delete movie')
    }
})

router.patch('/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId
        const movie = await updateMovie(id, req.body)
        return res.status(200).send(`successfully updated: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not patch movie')
    }
})

router.post('/:movieId/comments', async (req, res) => {
    try {
        const id = { _id: req.params.movieId }
        await addCommentToMovie(id, req.body.comment)
        return res.status(201).send('comment added successfully')
    } catch (e) {
        return res.status(500).send('can not add comment')
    }
})

module.exports = router
