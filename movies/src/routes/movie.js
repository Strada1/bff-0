const express = require('express')
const {
    getMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    getMovie
} = require('../services/movieService')
const { validate } = require('../middlewares')
const { validationResult, body, param } = require('express-validator')
const NodeCache = require("node-cache");
const { isAdmin } = require('../services/userService')

const router = express.Router()

const movieCache = new NodeCache( { stdTTL: 3600 } )

const fieldValidators = [
    body('title').matches(/[a-zA-Zа-яА-Я0-9]/).trim().optional().withMessage('title must contain only letters or numbers'),
    body('year').isInt().optional().withMessage('year must be int'),
    body('director').isMongoId().optional().withMessage('director must be MongoId')
]

const paramValidator = param('movieId').isMongoId().withMessage('movieId must be MongoId')

router.get('/movies', async (req, res) => {
    try {
        const [email, password] = req.headers.authorization.split(' ')
        const isRightsEnough = await isAdmin(email, password)
        if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights')

        if (Object.keys(req.query).length === 0 && movieCache.has('movies')) {
            return res.status(200).send(movieCache.get('movies'))
        } else {
            const movies = await getMovies(req.query)
            movieCache.set('movies', movies)
            return res.status(200).send(movies)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get movies')
    }
})

router.get('/movies/:movieId', paramValidator, async (req, res) => {
    try {
        const [email, password] = req.headers.authorization.split(' ')
        const isRightsEnough = await isAdmin(email, password)
        if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights')

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const movie = await getMovie(req.params.movieId)
        return res.status(200).send(movie)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get movie')
    }
})

router.post('/movies',
    validate(['title', 'year']),
    ...fieldValidators,
    async (req, res) => {
        try {
            const [email, password] = req.headers.authorization.split(' ')
            const isRightsEnough = await isAdmin(email, password)
            if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights')

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            movieCache.del('movies')
            const movie = await createMovie(req.body)
            return res.status(201).send(`successfully created: ${movie}`)
        } catch (e) {
            console.log(e)
            return res.status(500).send('can not create movie')
        }
    })

router.delete('/movies/:movieId', paramValidator, async (req, res) => {
    try {
        const [email, password] = req.headers.authorization.split(' ')
        const isRightsEnough = await isAdmin(email, password)
        if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights')

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        movieCache.del('movies')
        const movie = await deleteMovie(req.params.movieId)
        return res.status(200).send(`successfully deleted: ${movie}`)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not delete movie')
    }
})

router.patch('/movies/:movieId',
    paramValidator,
    ...fieldValidators,
    async (req, res) => {
        try {
            const [email, password] = req.headers.authorization.split(' ')
            const isRightsEnough = await isAdmin(email, password)
            if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights')

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const { movieId } = req.params
            movieCache.del('movies')
            const movie = await updateMovie(movieId, req.body)
            return res.status(200).send(`successfully updated: ${movie}`)
        } catch (e) {
            console.log(e)
            return res.status(500).send('can not patch movie')
        }
    }
)

module.exports = router
