import express from 'express'
import Category from '../models/categories.js'

const router = express.Router()
router.post('/', async (req, res) => {
  try {
    await Category.create(req.body)
    return res.status(201).send('category created')
  } catch (error) {
    console.log(error)
    return res.status(400).send("category isn't create")
  }
})

export default router
