const express = require('express')
const { getDirectorMoviesCount, getMoviesBetweenYears } = require('../services/testService')
const router = express.Router()

router.get('/test/:directorId', async (req, res) => {
    try {
        const moviesCount = await getDirectorMoviesCount(req.params.directorId)
        console.log(moviesCount)
        return res.status(200).send(moviesCount)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get moviesCount')
    }
})
router.get('/movies/count', async (req, res) => {
    try {
        const {gt, lt} = req.body
        const movies = await getMoviesBetweenYears(gt, lt)
        return res.status(200).send(movies)
    } catch (e) {
        return res.status(500).send('can not get movies count')
    }
})

module.exports = router