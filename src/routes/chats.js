const express = require('express');
const { body, param } = require('express-validator');
const { validationErrorsHandler } = require('../middlewares/validationErrorsHandler');
const router = express.Router();

router.post(
  '/',
  checkAuth(),
  body('title', 'Should be string, greater then 1 symbol')
    .isString()
    .isLength({ min: 1 }),
  body('users.*', 'Should be array of ObjectId').isMongoId().optional(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await createChat(req.user._id, req.body);
      if (!chat) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).json(chat);
    } catch (error) {
      return res
        .status(500)
        .send('Can not create chat\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await deleteChat(req.params._id, req.user);
      if (!chat) {
        return res.status(403).send('Authorization fail.');
      }
      return res.status(200).send(`Chat ${chat.title} deleted.`);
    } catch (error) {
      return res
        .status(500)
        .send('Can not delete chat\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  body('title', 'Should be string, greater then 1 symbol')
    .isString()
    .isLength({ min: 1 }),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await updateChat(req.params._id, req.body, req.user);
      if (!chat) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).json(chat);
    } catch (error) {
      return res
        .status(500)
        .send('Can not update chat\nerror: ' + error.message);
    }
  }
);

router.get('/', checkAuth([userRoles.admin]), async (req, res) => {
  try {
    const chats = await getChats();
    if (!chats) {
      return res.status(400).send('Bad request.');
    }
    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).send('Can not get chats\nerror: ' + error.message);
  }
});

router.get(
  '/:id',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await getChat(req.params.id);
      if (!chat) {
        return res.status(404).send('Chat not found.');
      }
      return res.status(200).json(chat);
    } catch (error) {
      return res.status(500).send('Can not get chat\nerror: ' + error.message);
    }
  }
);

router.post(
  '/:id/users',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  body('users.*', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await addUsers(req.params.id, req.body, req.user);
      if (!chat) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).json(chat);
    } catch (error) {
      return res
        .status(500)
        .send('Can not add users in chat\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id/users',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  body('users.*', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const chat = await deleteUsers(req.params.id, req.body, req.user);
      if (!chat) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).json(chat);
    } catch (error) {
      return res
        .status(500)
        .send('Can not delete users from chat\nerror: ' + error.message);
    }
  }
);

module.exports = router;
