const express = require('express')
const {
    getCategories,
    createCategory,
    updateCategory,
} = require('../services/categoryService')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const categories = await getCategories()
        return res.status(200).send(categories)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get categories')
    }
})

router.post('/', async (req, res) => {
    try {
        const category = await createCategory(req.body)
        return res.status(201).send(category)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create category')
    }
})

router.patch('/:categoryId', async (req, res) => {
    try {
        const id = req.params.categoryId
        const category = await updateCategory(id, req.body)
        return res.status(200).send(`successfully updated: ${category}`)
    } catch (e) {
        return res.status(500).send('can not patch category')
    }
})

module.exports = router
