import { Router } from 'express';

import {
  createUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../services/users.js';

import { authorization, ROLES } from '../middlewares/passport.js';
import { configUserData } from '../viewmodels/configUserData.js';
import ApiError, { HTTP_STATUSES } from '../exceptions/apiError.js';

const router = new Router();
const {
  OK_200,
  CREATED_201,
  NO_CONTENT_204,
} = HTTP_STATUSES;

// registration
router.post('/registration',
  // TODO validations
  async (req, res, next) => {
    try {
      const { email, password, nickname, username } = req.body;
      const createdUser = await createUser({ email, password, nickname, username });

      return res
        .status(CREATED_201)
        .json(configUserData(createdUser, { token: createdUser.token }));
    } catch (err) {
      next(err);
    }
  }
);

// authentication
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authenticatedUser = await loginUser({ email, password });

    return res
      .status(OK_200)
      .send(configUserData(authenticatedUser, { token: authenticatedUser.token }));
  } catch (err) {
    next(err);
  }
});

router.get('/:userId',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await getUser(userId);

      if (!user) {
        return next(ApiError.NotFound_404('User not found'));
      }

      return res
        .status(OK_200)
        .json(configUserData(user, { token: user.token }));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();

    return res.status(OK_200).json(users.map(configUserData));
  } catch (err) {
    next(err);
  }
});

router.put('/me',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { token } = req.user;
      const { password, nickname, username } = req.body;

      const updatedUser = await updateUser(token,{ password, nickname, username });

      if (!updatedUser) {
        return next(ApiError.NotFound_404('User not found'));
      }

      return res
        .status(OK_200)
        .json(configUserData(updatedUser, { token: updatedUser.token }));
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:userId',
  // TODO validations
  authorization([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { roles, chats } = req.body;

      const updatedUser = await updateUser(userId, { roles, chats });

      if (!updatedUser) {
        return next(ApiError.NotFound_404('User not found'));
      }

      return res
        .status(OK_200)
        .json(configUserData(updatedUser, { token: updatedUser.token }));
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:userId',
  authorization([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await deleteUser(userId);

      if (!deletedUser) {
        return next(ApiError.NotFound_404('User not found'));
      }

      return res.status(NO_CONTENT_204).json(configUserData(deletedUser));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
