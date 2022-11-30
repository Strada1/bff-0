import express from 'express'
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'
import {validateUser} from '../helpers/validate.js'
import {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
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
      const {email, password} = req.body
      const indexAtEmail = email.indexOf('@')
      const username = email.slice(0, indexAtEmail)
      const roles = ['default']
      const token = jwt.sign({email, password}, process.env.JWT_SECRET)
      const dataUser = {email, username, token, roles}
      await createUser(dataUser)
      return res.status(201).send('here is your token  ' + token)
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
      const candidate = await getUserByEmail(email)
      const decode = jwt.verify(candidate.token, process.env.JWT_SECRET)
      if (password !== decode.password) {
        return res.status(401).send('Incorrect login or password')
      }
      return res.status(201).send('here is your token  ' + candidate.token)
    } catch (error) {
      return next(error)
    }
  })

export default router
