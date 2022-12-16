const express = require('express');
const { body, param } = require('express-validator');
const userRoles = require('../helpers/userRoles');
const { checkAuth } = require('../middlewares/checkAuth');
const { validationErrorsHandler } = require('../middlewares/validationErrorsHandler');
const router = express.Router();

router.get('/', checkAuth([userRoles.admin]), async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send('Can not get users\nerror: ' + error.message);
  }
});

router.get(
  '/:id',
  checkAuth([userRoles.admin]),
  param('id', 'should be ObjectId.').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found.');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send('Can not get user\nerror: ' + error.message);
    }
  }
);

router.post(
  '/',
  body('email', 'should be email').isEmail().trim().normalizeEmail(),
  body('username', 'should be string, greater then 3 symbols')
    .isString()
    .isLength({ min: 3 }),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await createUser(req.body);
      if (!user) {
        return res
          .status(400)
          .send(`User with email: ${req.body.email} already registered.`);
      }
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('Can not create user\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  checkAuth([userRoles.admin]),
  param('id', 'should be ObjectId.').isMongoId(),
  body('email', 'should be email').isEmail().trim().normalizeEmail().optional(),
  body('username', 'should be string, greater then 3 symbols')
    .isString()
    .isLength({ min: 3 })
    .optional(),
  body('token', 'should be jwt token').isJWT().optional(),
  body('roles', 'should be array').isArray().optional(),
  body('chats', 'should be array').isArray().optional(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).send('User not found.');
      }
      return res.status(204).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('Can not update user\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id',
  checkAuth([userRoles.admin]),
  param('id', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      await deleteUser(req.params.id);
      return res.status(200);
    } catch (error) {
      return res
        .status(500)
        .send('Can not delete user\nerror: ' + error.message);
    }
  }
);

router.get('/me', checkAuth(), async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res
      .status(500)
      .send('Can not get user info\nerror: ' + error.message);
  }
});

router.put(
  '/me',
  checkAuth(),
  body('username', 'Should be string, greater then 3 symbols')
    .isString()
    .isLength({ min: 3 }),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const updatedUser = await updateUser(req.user._id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .send('Can not update user info\nerror: ' + error.message);
    }
  }
);

router.get('/me/chats', checkAuth(), async (req, res) => {
  try {
    return res.status(200).json(req.user.chats);
  } catch (error) {
    return res
      .status(500)
      .send('Can not get user chats info\nerror: ' + error.message);
  }
});

router.post(
  '/me/chats',
  checkAuth(),
  body('chat', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await userAddChat(req.user._id, req.body.chat);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('Can not add chat in user info\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/me/chats',
  checkAuth(),
  body('chat', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await userDeleteChat(req.user._id, req.body.chat);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('Can not delete chat from user info\nerror: ' + error.message);
    }
  }
);

module.exports = router;
