import express from 'express'
import jwt from 'jsonwebtoken'
import passport from '../middleware/passport.js'
import {body, validationResult} from 'express-validator'
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
      const token = jwt.sign({email, password, roles}, process.env.JWT_SECRET)
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
  .get('/', passport, async (req, res, next) => {
    try {
      const users = await getUsers()
      return res.status(201).send(users)
    } catch (error) {
      return next(error)
    }
  })
  .put(
    '/:id',
    body('email').isEmail(),
    body(
      'old_password',
      'old_password length must be between 5 and 20 characters'
    ).isLength({min: 5, max: 20}),
    body(
      'new_password',
      'new_password length must be between 5 and 20 characters'
    ).isLength({min: 5, max: 20}),
    passport,
    async (req, res, next) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({errors: errors.array()})
        }

        const {email, old_password, new_password} = req.body
        if (old_password === new_password) {
          return res
            .status(400)
            .send('the new password cannot be equal to the old one')
        }

        const id = req.params.id
        const user = await getUser(id)
        if (!user) return res.status(404).send('user not found')

        const decode = jwt.verify(user.token, process.env.JWT_SECRET)
        if (old_password !== decode.password) {
          return res.status(401).send('Incorrect login or password')
        }

        const token = jwt.sign(
          {email, password: new_password, roles: user.roles},
          process.env.JWT_SECRET
        )
        await updateUser(id, {email, token})
        return res.status(201).send('here is your new token  ' + token)
      } catch (error) {
        return next(error)
      }
    }
  )
  .delete('/:id', passport, async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)

      const isAdmin = decode.roles.includes('admin')
      if (!isAdmin) return res.status(403).send("You aren't admin")

      const id = req.params.id
      const user = await deleteUser(id)
      if (!user) return res.status(404).send('user not found')

      return res.status(201).send('deleted user')
    } catch (error) {
      return next(error)
    }
  })

export default router
