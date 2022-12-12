import { Router } from 'express';
import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  updateUserById,
  addMovieInFavorites,
  deleteMovieFromFavorites,
  getCountFavoritesFromAllUsers,
} from '../services/user.js';

import { authorization, ROLES } from '../middlewares/passport.js';
import ApiError from '../exceptions/apiError.js';

const router = new Router();

router.post('/registration', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await createUser({ email, password, username });

    return res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

// authentication
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

router.put('/me',
  authorization(ROLES.USER),
  async (req, res, next) => {
    try {
      const { password, username } = req.body;
      const token = req.user.token;

      const user = await updateUser({ token }, { password, username });

      if (!user) {
        return next( ApiError.NotFound('No user for this ID') );
      }

      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:userId',
  authorization([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { password, username, roles } = req.body;

      const user = await updateUserById({ userId }, { password, username, roles });

      if (!user) {
        return next( ApiError.NotFound('No user for this ID') );
      }

      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:userId',
  authorization(ROLES.ADMIN),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await deleteUser(userId);

      if (!deletedUser) {
        return next(ApiError.NotFound('No user for this ID'));
      }

      return res.status(200).send(deletedUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/:userId/favorites', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.query;
    const user = await addMovieInFavorites(userId, movieId);

    if (!user) {
      return next(ApiError.NotFound('No user for this ID'));
    }

    return res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId/favorites', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.query;
    const user = await deleteMovieFromFavorites(userId, movieId);

    if (!user) {
      return next(ApiError.NotFound('No user for this ID'));
    }

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/favorites/aggregation/countFavoritesFromAllUsers',
  authorization([ROLES.ADMIN]),
  async (req, res, next) => {
    try {
      const result = await getCountFavoritesFromAllUsers();

      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
