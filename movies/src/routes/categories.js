const express = require('express')
const Category = require('../models/Category')

const categories = express.Router()

categories.get('/', async (req, res) => {
    try {
        const response = await Category.collection.find().toArray()
        return res.status(200).send(response)
    } catch (e) {
        console.log(e)
        return res.status(500).send('bad request')
    }
})

categories.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).send(category)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create category')
    }
})

module.exports = categories
