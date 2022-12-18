const express = require('express');
const {getMessages, getMessage, createMessage, deleteMessage, updateMessage} = require("../services/message");
const router = express.Router();

router.get('/messages', async (req, res) => {
  try {
    const messages = await getMessages();
    return res.status(200).send(messages);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get messages');
  }
});

router.get('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getMessage(id);
    return res.status(200).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get message');
  }
});

router.post('/messages', async (req, res) => {
  try {
    const message = await createMessage(req.body);
    return res.status(201).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not create message');
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteMessage(id);
    return res.status(200).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not delete message');
  }
});

router.patch('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await updateMessage(id, req.body);
    return res.status(200).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not update message');
  }
});

module.exports = router;