const express = require('express');
const {getMessages, getMessage, createMessage, deleteMessage, updateMessage} = require('../services/message');
const { checkAuth } = require('../utils/auth');
const router = express.Router();

router.get('/messages', checkAuth(), async (req, res) => {
  try {
    const messages = await getMessages();
    if (messages) {
      return res.status(200).send(messages);
    }
    return res.status(403).send('you can not get messages from this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get messages');
  }
});

router.get('/messages/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getMessage(id);
    return res.status(200).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get message');
  }
});

router.post('/messages', checkAuth(), async (req, res) => {
  try {
    const message = await createMessage(req.body);
    if (message) {
      return res.status(201).send(message);
    }
    return res.status(403).send('you can not post in this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not create message');
  }
});

router.delete('/messages/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteMessage(req.user, id);
    if (message) {
      return res.status(200).send(message);
    }
    return res.status(403).send('you can not delete this message');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not delete message');
  }
});

router.patch('/messages/:id', checkAuth(),  async (req, res) => {
  try {
    const { id } = req.params;
    const message = await updateMessage(req.user, id, req.body);
    if (message) {
      return res.status(200).send(message);
    }
    return res.status(403).send('you can not update this message');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not update message');
  }
});

module.exports = router;