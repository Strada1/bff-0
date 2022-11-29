import express from 'express'
import {validationResult} from 'express-validator'
import {validateUser} from '../helpers/validate.js'
import {
  createUser,
  getUsers,
  getUser,
  checkAuthUser,
  updateUser,
  deleteUser
} from '../helpers/users.js'

const router = express.Router()

router
  .post('/', validateUser(), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      const body = req.body
      const indexAtEmail = body.email.indexOf('@')
      body['username'] = req.body.email.slice(0, indexAtEmail)
      body.roles = ['default']
      await createUser(body)
      return res.status(201).send('user created')
    } catch (error) {
      return next(error)
    }
  })
  .post('/auth', validateUser(), async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      const {email, password} = req.body
      const isAuth = await checkAuthUser(email, password)
      if (!isAuth) {
        return res.status(401).send('Incorrect login or password')
      }

      return res.status(201).send(`${email} ${password}`)
    } catch (error) {
      return next(error)
    }
  })

export default router
