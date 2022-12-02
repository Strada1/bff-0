import { Router } from 'express';
import {
  createUser,
  loginUser,
  updateUser,
} from '../services/user.js';

import checkAuth from '../middlewares/checkAuth.js';
import checkRole from '../middlewares/checkRole.js';
import { ROLES } from '../services/user.js';
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

router.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, password, username } = req.body;
    const user = await updateUser(userId, { email, password, username });

    if (!user) {
      return next( ApiError.NotFound('No user for this ID') );
    }

    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', checkAuth, checkRole(ROLES.ADMIN), async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

export default router;
