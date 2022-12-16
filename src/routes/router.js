const express = require('express');
const router = express.Router();
const users = require('./users');
const chats = require('./chats');
const  messages = require('./messages');
//need 21 routes
router.use('/api/users', users); // 10 routes
router.use('/api/chats', chats); // 7 routes
router.use('/api/messages', chats);

module.exports = router;
