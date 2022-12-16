const express = require('express');
const { body, param, query } = require('express-validator');
const { checkAuth } = require('../middlewares/checkAuth');
const { validationErrorsHandler } = require('../middlewares/validationErrorsHandler');
const router = express.Router();

router.post(
  '/',
  checkAuth(),
  body('text', 'Should be string').isString().trim().isLength({ min: 1 }),
  body('chat', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const message = await createMessage(req.body, req.user._id);
      return res.status(201).json(message);
    } catch (error) {
      return res
        .status(500)
        .send('Can not create message\nerror: ' + error.message);
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
      const message = await deleteMessage(req.params.id, req.user);
      if (!message) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).send('Message deleted.');
    } catch (error) {
      return res
        .status(500)
        .send('Can not delete message\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  checkAuth(),
  param('id', 'Should be ObjectId').isMongoId(),
  body('text', 'Should be string, greater then 1 symbol')
    .isString()
    .isLength({ min: 1 }),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const message = await updateMessage(req.params.id, req.body, req.user);
      if (!message) {
        return res.status(400).send('Bad request.');
      }
      return res.status(204).json(message);
    } catch (error) {
      return res
        .status(500)
        .send('Can not update message\nerror: ' + error.message);
    }
  }
);

router.get(
  '/',
  checkAuth(),
  query('chat', 'Should be ObjectId').isMongoId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const messages = await getMessages(req.query, req.user);
      if (!messages) {
        return res.status(400).send('Bad request.');
      }
      return res.status(200).json(messages);
    } catch (error) {
      return res
        .status(500)
        .send('Can not get messages\nerror: ' + error.message);
    }
  }
);

module.exports = router;
