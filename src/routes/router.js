const express = require('express');
const router = express.Router();
const users = require('./users');
const chats = require('./chats');
const messages = require('./messages');

router.use('/api/users', users);
router.use('/api/chats', chats);
router.use('/api/messages', messages);

module.exports = router;
