const express = require('express');
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  getFavoriteMoviesCount
} = require('../services/userService');
const { validate, checkIsAdmin } = require('../middlewares');
const { validationResult, body, param } = require('express-validator');
const { createToken } = require('../utils');
const passport = require('passport');

const router = express.Router();

const fieldValidators = [
  body('email').isEmail().optional().withMessage('Invalid email'),
  body('password').isLength({ min: 5 }).optional().withMessage('min password character - 5')
];
const paramValidator = param('userId').isMongoId().withMessage('userId must be MongoId');

router.get('/user/:userId',
  passport.authenticate('bearer', { session: false }),
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { userId } = req.params;
      const user = await getUser(userId);
      return res.status(200).send(user);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not get user');
    }
  });

router.post('/user',
  passport.authenticate('bearer', { session: false }),
  validate(['email', 'password']),
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { email, password, roles } = req.body;
      const token = await createToken(email, password);
      const user = await createUser({ email, roles, token });
      return res.status(201).send(user);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not create user');
    }
  });

router.patch('/user/:userId',
  passport.authenticate('bearer', { session: false }),
  paramValidator,
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { userId } = req.params;
      const user = await updateUser(userId, req.body);
      return res.status(200).send(`successfully updated: ${JSON.stringify(user)}`);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not patch user');
    }
  });

router.delete('/user/:userId',
  passport.authenticate('bearer', { session: false }),
  checkIsAdmin,
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await deleteUser(req.params.userId);
      return res.status(200).send(`successfully deleted: ${JSON.stringify(user)}`);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not delete user');
    }
  });

router.post('/auth', validate(['email', 'password']), ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const token = await authUser(email, password);
    if (token) {
      return res.status(201).send(token);
    }
    return res.status(403).send('invalid authentication data, please check your email and password');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not auth user');
  }
});

router.get('/favorites_count',
  passport.authenticate('bearer', { session: false }),
  checkIsAdmin,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const result = await getFavoriteMoviesCount();
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not get favorites count');
    }
  }
);

module.exports = router;