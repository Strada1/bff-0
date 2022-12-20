import { Router } from 'express';

import {
  createMessage,
  getMessages,
} from '../services/messages.js';

import { authorization, ROLES } from '../middlewares/passport.js';
import { HTTP_STATUSES } from '../exceptions/apiError.js';
import { configMessageData } from '../viewmodels/configMessageData.js';

const router = new Router();
const {
  OK_200,
  CREATED_201,
} = HTTP_STATUSES;

router.post('/',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { chatId } = req.query;
      const userId = req.user._id
      const { text } = req.body;

      const createdMessage = await createMessage({ userId, chatId, text });

      return res
        .status(CREATED_201)
        .json(createdMessage);
        // .json(configMessageData(createdMessage));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { chatId } = req.query;
      const user = req.user;

      const messages = await getMessages({ chatId, user });

      return res
        .status(OK_200)
        .json(messages.map(configMessageData));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
