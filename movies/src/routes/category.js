const express = require('express')
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../services/categoryService')
const { validate } = require('../middlewares')

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

router.post('/', validate(['name']), async (req, res) => {
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
        const { categoryId } = req.params
        const category = await updateCategory(categoryId, req.body)
        return res.status(200).send(`successfully updated: ${category}`)
    } catch (e) {
        return res.status(500).send('can not patch category')
    }
})

router.delete('/:categoryId', async (req, res) => {
    try {
        const category = await deleteCategory(req.params.categoryId)
        return res.status(200).send(`successfully deleted: ${category}`)
    } catch (e) {
        return res.status(500).send('can not delete category')
    }
})

module.exports = router
