const { Router } = require('express');
const { validationResult, body } = require('express-validator');
const validate = require('../middlewares/validate');
const { createUser, authUser } = require('../services/userServices');
const router = Router();

router.post(
  '/',
  validate(['email', 'username', 'password']),
  body('email', 'should be email').isEmail().trim().normalizeEmail(),
  body('password', 'should be grater then 3 symbols').isLength({ min: 3 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await createUser(req.body);
      if (user) {
        return res.status(201).send('User created');
      }
      return res
        .status(400)
        .send(`User with email: "${req.body.email}" is already registered`);
    } catch (error) {
      return res
        .status(500)
        .send('failed to create movie\nerror: ' + error.message);
    }
  }
);

router.post('/auth', validate(['email', 'password']), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = await authUser(req.body);
    if (!token) {
      return res.status(401).send('Wrong email or password');
    }
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send('failed to auth\nerror: ' + error.message);
  }
});

module.exports = router;
