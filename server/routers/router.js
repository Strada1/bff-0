import { Router } from 'express';
import {
  moviesRouter,
  commentsRouter,
  categoriesRouter,
  directorsRouter,
  usersRouter,
} from './index.js';

const router = new Router();

router.use('/movies', moviesRouter);
router.use('/comments', commentsRouter);
router.use('/categories', categoriesRouter);
router.use('/directors', directorsRouter);
router.use('/users', usersRouter);

export default router;
