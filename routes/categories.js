import express from 'express'
import {createCategory} from '../helpers/services.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await createCategory(req.body)
    return res.status(201).send('category created')
  } catch (error) {
    return next(error)
  }
})

export default router
