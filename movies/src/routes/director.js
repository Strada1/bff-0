const express = require('express')
const {
    getDirectors,
    createDirector,
    deleteDirector,
    updateDirector,
} = require('../services/directorService')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const directors = await getDirectors()
        return res.status(200).send(directors)
    } catch (e) {
        return res.status(500).send('can not get directors')
    }
})

router.post('/', async (req, res) => {
    try {
        const director = await createDirector(req.body)
        return res.status(201).send(`successfully created: ${director}`)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create director')
    }
})

router.delete('/:directorId', async (req, res) => {
    try {
        const director = await deleteDirector(req.params.directorId)
        return res.status(200).send(`successfully deleted: ${director}`)
    } catch (e) {
        return res.status(500).send('can not delete movie')
    }
})

router.patch('/:directorId', async (req, res) => {
    try {
        const { directorId } = req.params
        const director = await updateDirector(directorId, req.body)
        return res.status(200).send(`successfully updated: ${director}`)
    } catch (e) {
        return res.status(500).send('can not patch director')
    }
})

module.exports = router
