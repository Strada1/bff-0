const express = require('express')
const {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    getMovie
} = require('../services/movieService')
const { validate } = require('../middlewares')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const movies = await getMovies()
        return res.status(200).send(movies)
    } catch (e) {
        return res.status(500).send('can not get movies')
    }
})

router.get('/:movieId', async (req, res) => {
    try {
        const movie = await getMovie(req.params.movieId)
        return res.status(200).send(movie)
    } catch (e) {
        return res.status(500).send('can not get movie')
    }
})

router.post('/', validate(['title', 'year']), async (req, res) => {
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
        const { movieId } = req.params
        const movie = await updateMovie(movieId, req.body)
        return res.status(200).send(`successfully updated: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not patch movie')
    }
})

module.exports = router
