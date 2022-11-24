const express = require('express')
const { getDirectorMoviesCount, getMoviesBetweenYears } = require('../services/testService')
const { body, param, validationResult } = require('express-validator')
const router = express.Router()

const fieldValidators = [
    body('gt').isInt().optional().withMessage('gt must be int'),
    body('lt').isInt().optional().withMessage('lt must be int'),
]

const paramValidator = param('directorId').isMongoId().withMessage('directorId must be MongoId')

router.get('/test/:directorId', paramValidator, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const moviesCount = await getDirectorMoviesCount(req.params.directorId)
        return res.status(200).send(moviesCount)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get moviesCount')
    }
})
router.get('/movies/count', ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const {gt, lt} = req.body
        const movies = await getMoviesBetweenYears(gt, lt)
        return res.status(200).send(movies)
    } catch (e) {
        return res.status(500).send('can not get movies')
    }
})

module.exports = router