const express = require('express')
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../services/categoryService')
const { validate } = require('../middlewares')
const { validationResult, body, param } = require('express-validator')

const router = express.Router()

const fieldValidators = [
    body('name').matches(/[a-zA-Zа-яА-Я]/).trim().optional().withMessage('name must contain only letters')
]
const paramValidator = param('categoryId').isMongoId().withMessage('categoryId must be MongoId')

router.get('/categories', async (req, res) => {
    try {
        const { sort } = req.query
        const categories = await getCategories(sort)
        return res.status(200).send(categories)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not get categories')
    }
})

router.post('/categories', validate(['name']), ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const category = await createCategory(req.body)
        return res.status(201).send(category)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create category')
    }
})

router.patch('/categories/:categoryId', paramValidator, ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { categoryId } = req.params
        const category = await updateCategory(categoryId, req.body)
        return res.status(200).send(`successfully updated: ${category}`)
    } catch (e) {
        return res.status(500).send('can not patch category')
    }
})

router.delete('/categories/:categoryId', paramValidator, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const category = await deleteCategory(req.params.categoryId)
        return res.status(200).send(`successfully deleted: ${category}`)
    } catch (e) {
        return res.status(500).send('can not delete category')
    }
})

module.exports = router
