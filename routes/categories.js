import express from 'express'
import {validationResult} from 'express-validator'
import {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory
} from '../helpers/categories.js'
import {validate} from '../helpers/validate.js'

const router = express.Router()
const requiredKeys = ['title']

router
  .post('/', validate(requiredKeys), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      await createCategory(req.body)
      return res.status(201).send('category created')
    } catch (error) {
      return next(error)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allCategory = await getAllCategory()
      return res.status(201).send(allCategory)
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', validate(requiredKeys), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      const id = req.params.id
      const category = await updateCategory(id, req.body)
      if (!category) {
        return res.status(404).send('category not found')
      }
      return res.status(201).send('category is changed')
    } catch (error) {
      return next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const idDeletedCategory = await deleteCategory(id)
      if (!idDeletedCategory) {
        return res.status(404).send('category not found')
      }
      return res.status(201).send('category deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
