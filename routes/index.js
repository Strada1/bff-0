import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    return res.status(200).send('Welcome!')
  } catch (error) {
    return next(error)
  }
})

export default router
