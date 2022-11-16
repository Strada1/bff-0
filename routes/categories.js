import express from 'express'
import Category from '../models/categories.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await Category.create(req.body)
    return res.status(201).send('category created')
  } catch (error) {
    return next(error)
  }
})

export default router
