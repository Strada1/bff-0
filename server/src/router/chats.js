import { Router } from 'express';

import { authorization, ROLES } from '../middlewares/passport.js';
import {
  createChat,
  getChats,
  getChat,
  updateChat,
  addUserToChat,
  deleteUserFromChat,
} from '../services/chats.js';
import { configChatData } from '../viewmodels/configChatData.js';
import ApiError, { HTTP_STATUSES } from '../exceptions/apiError.js';

const router = new Router();
const {
  OK_200,
  CREATED_201,
  NO_CONTENT_204,
} = HTTP_STATUSES;

router.post('/',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { title } = req.body;
      const userId = req.user.id

      const createdChat = await createChat({ userId, title });

      return res
        .status(CREATED_201)
        .json(configChatData(createdChat, { owner: createdChat.owner }));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/',
  authorization(),
  async (req, res, next) => {
    try {
      const { user, owner } = req.query;
      const filters = { user, owner };

      const chats = await getChats({ filters });

      return res
        .status(OK_200)
        .json(chats.map(chat => configChatData(chat, { owner: chat.owner })));
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:chatId',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const chat = await getChat(chatId);

      if (!chat) {
        return next(ApiError.NotFound_404('Chat not found'));
      }

      if (req.user.roles.includes(ROLES.ADMIN)) {
        return res
          .status(OK_200)
          .json(configChatData(chat, { owner: chat.owner }));
      }

      return res
        .status(OK_200)
        .json(configChatData(chat));
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:chatId',
  // TODO validations
  authorization(),
  async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const { title } = req.body;

      const updatedChat = await updateChat(chatId, req.user, { title });

      if (!updatedChat) {
        return next(ApiError.NotFound_404('Chat not found'));
      }

      return res
        .status(200)
        .json(configChatData(updatedChat));
    } catch (err) {
      next(err);
    }
  }
);

router.post('/:chatId/users/me',
  // TODO validations
  authorization([ROLES.USER]),
  async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const userId = req.user.id;

      const updatedChat = await addUserToChat(chatId, userId);

      if (!updatedChat) {
        return next(ApiError.NotFound_404('Chat not found'));
      }

      return res
        .status(OK_200)
        .json(configChatData(updatedChat));
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:chatId/users/me',
  // TODO validations
  authorization([ROLES.USER]),
  async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const userId = req.user.id;

      const updatedChat = await deleteUserFromChat(chatId, userId);

      if (!updatedChat) {
        return next(ApiError.NotFound_404('Chat not found'));
      }

      return res
        .status(OK_200)
        .json(configChatData(updatedChat));
    } catch (err) {
      next(err);
    }
  }
);

export default router;