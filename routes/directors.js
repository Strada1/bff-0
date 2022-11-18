import express from 'express'
import {
  createDirector,
  getAllDirector,
  updateDirector,
  deleteDirector
} from '../helpers/directors.js'

const router = express.Router()

router
  .post('/', async (req, res, next) => {
    try {
      await createDirector(req.body)
      return res.status(201).send('director created')
    } catch (error) {
      return next(error)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allCategory = await getAllDirector()
      return res.status(201).send(allCategory)
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const category = await updateDirector(id, req.body)
      if (!category) {
        return res.status(404).send('director not found')
      }
      return res.status(201).send('director is changed')
    } catch (error) {
      return next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const idDeletedCategory = await deleteDirector(id)
      if (!idDeletedCategory) {
        return res.status(404).send('director not found')
      }
      return res.status(201).send('director deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
