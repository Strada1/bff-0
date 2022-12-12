import { Router } from 'express';

import {
  usersRouter,
  chatsRouter,
  messagesRouter,
} from './index.js';

const router = new Router();

router.use('/users', usersRouter);
router.use('/chats', chatsRouter);
router.use('/messages', messagesRouter);

export default router;
