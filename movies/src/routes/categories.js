const express = require('express')
const Category = require('../models/Category')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).send(categories)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get categories')
    }
})

router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).send(category)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create category')
    }
})

module.exports = router
