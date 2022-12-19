const express = require('express');
const { getChats, getChat, createChat, deleteChat, updateChat } = require('../services/chat');
const { checkAuth } = require('../utils/auth');
const { userRoles } = require('../services/user');
const router = express.Router();

router.get('/chats', checkAuth([userRoles.admin]), async (req, res) => {
  try {
    const chats = await getChats();
    return res.status(200).send(chats);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get chats');
  }
});

router.get('/chats/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await getChat(id);
    return res.status(200).send(chat);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get chat');
  }
});

router.post('/chats', checkAuth(), async (req, res) => {
  try {
    const chat = await createChat(req.user._id, req.body);
    return res.status(201).send(chat);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not create chat');
  }
});

router.delete('/chats/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await deleteChat(req.user, id);
    if (chat) {
      return res.status(200).send(chat);
    }
    return res.status(500).send('you can not delete this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not delete chat');
  }
});

router.patch('/chats/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await updateChat(req.user, id, req.body);
    if (chat) {
      return res.status(200).send(chat);
    }
    return res.status(500).send('you can not update this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not update chat');
  }
});

module.exports = router;