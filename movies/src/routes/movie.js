const express = require('express')
const {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    addComment,
    deleteComment,
    getMovie,
    updateComment,
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

router.get('/:movieId', async (req, res) => {
    try {
        const movie = await getMovie(req.params.movieId)
        return res.status(200).send(movie)
    } catch (e) {
        return res.status(500).send('can not get movie')
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
        const { movieId } = req.params
        const movie = await updateMovie(movieId, req.body)
        return res.status(200).send(`successfully updated: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not patch movie')
    }
})

router.get('/:movieId/comments', async (req, res) => {
    try {
        const { movieId } = req.params
        const movie = await getMovie(movieId)
        const comments = movie.comments
        return res.status(200).send(comments)
    } catch (e) {
        return res.status(500).send('can not get comments')
    }
})

router.post('/:movieId/comments', async (req, res) => {
    try {
        const { movieId } = req.params
        const movie = await addComment(movieId, req.body)
        return res.status(201).send(`comment added successfully: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not add comment')
    }
})

router.delete('/:movieId/comments/:commentId', async (req, res) => {
    try {
        const { movieId, commentId } = req.params
        const movie = await deleteComment(movieId, commentId)
        return res.status(200).send(`comment successfully deleted: ${movie}`)
    } catch (e) {
        return res.status(500).send('can not delete comment')
    }
})

router.patch('/:movieId/comments/:commentId', async (req, res) => {
    try {
        const { movieId, commentId } = req.params
        const comment = await updateComment(movieId, commentId, req.body)
        return res.status(200).send(`successfully updated: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not patch movie')
    }
})

module.exports = router
