const { Router } = require('express');
const { validationResult, body } = require('express-validator');
const validate = require('../middlewares/validate');
const {
  createUser,
  authUser,
  updateUserRoles,
  deleteUser,
  updateUser,
  UserRoles,
} = require('../services/userServices');
const { checkAuth, checkRole } = require('../middlewares/checkAuth');
const validateParamId = require('../middlewares/validateParamId');
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

router.put(
  '/:id/info',
  checkAuth,
  validateParamId,
  body('email', 'Should be valid mail')
    .isEmail()
    .optional()
    .normalizeEmail()
    .trim(),
  body('username', 'Should be string').isString().optional().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const { username, email } = req.body;
      const user = await updateUser(id, { username, email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('failed to update user\nerror:' + error.message);
    }
  }
);

router.put(
  '/:id/roles',
  validateParamId,
  checkAuth,
  checkRole(UserRoles.admin),
  body('roles', 'roles should be array').isArray(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;

      const user = await updateUserRoles(id, req.body);
      if (!user) {
        return res.status(404).send('user not found');
      }

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('failed to update user\nerror:' + error.message);
    }
  }
);

router.delete(
  '/:id',
  validateParamId,
  checkAuth,
  checkRole(UserRoles.admin),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await deleteUser(req.params.id);
      return res.status(200).send('successfully deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete user\nerror:' + error.message);
    }
  }
);

module.exports = router;
