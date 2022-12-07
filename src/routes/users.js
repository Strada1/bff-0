const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const {
  createUser,
  authUser,
  updateUserRoles,
  deleteUser,
  updateUser,
  UserRoles,
  getAllUsers,
  addFavorite,
  deleteFavorite,
  countFavorites,
} = require('../services/userServices');
const { checkAuth } = require('../middlewares/checkAuth');
const validateParamId = require('../middlewares/validateParamId');
const {
  validationErrorsHandler,
} = require('../middlewares/validationErrorsHandler');
const router = Router();

router.get('/', checkAuth([UserRoles.admin]), async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send('failed to get users\nerror: ' + error.message);
  }
});

router.get('/me', checkAuth(), async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).send('failed to get user\nerror: ' + error.message);
  }
});

router.post(
  '/',
  validate(['email', 'username', 'password']),
  body('email', 'should be email').isEmail().trim().normalizeEmail(),
  body('password', 'should be grater then 3 symbols').isLength({ min: 3 }),
  validationErrorsHandler,
  async (req, res) => {
    try {
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
        .send('failed to create user\nerror: ' + error.message);
    }
  }
);

router.post(
  '/auth',
  validate(['email', 'password']),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await authUser(req.body);
      if (!user) {
        return res.status(401).send('Wrong email or password');
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send('failed to auth\nerror: ' + error.message);
    }
  }
);

router.put(
  '/me/info',
  checkAuth(),
  body('username', 'Should be string').isString().optional().trim(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const { username } = req.body;
      const user = await updateUser(req.user._id, { username });
      if (!user) {
        return res.status(404).send('Cant update user');
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
  '/:id/info',
  checkAuth([UserRoles.admin]),
  validateParamId(),
  body('email', 'Should be valid mail')
    .isEmail()
    .optional()
    .normalizeEmail()
    .trim(),
  body('username', 'Should be string').isString().optional().trim(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const user = await updateUser(id, { username, email });
      if (!user) {
        return res.status(404).send('Cant update user');
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
  checkAuth([UserRoles.admin]),
  validateParamId(),
  body('roles', 'roles should be array').isArray(),
  validationErrorsHandler,
  async (req, res) => {
    try {
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

router.post(
  '/me/favorites',
  checkAuth(),
  body('movie', 'roles should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await addFavorite(req.user._id, req.body);

      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .send('failed to update favorites\nerror:' + error.message);
    }
  }
);

router.delete(
  '/me/favorites',
  checkAuth(),
  body('movie', 'roles should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const user = await deleteFavorite(req.user._id, req.body);
      if (!user) {
        return res.status(404).send('user not found');
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send('failed to delete favorites\nerror:' + error.message);
    }
  }
);

router.delete(
  '/:id',
  checkAuth([UserRoles.admin]),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      await deleteUser(req.params.id);
      return res.status(200).send('successfully deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete user\nerror:' + error.message);
    }
  }
);

router.get(
  '/favorites/count',
  checkAuth([UserRoles.admin]),
  async (req, res) => {
    try {
      const count = await countFavorites();
      return res.status(200).send(count);
    } catch (error) {
      return res
        .status(500)
        .send('failed to count favorites\nerror:' + error.message);
    }
  }
);

module.exports = router;
