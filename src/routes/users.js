const express = require('express');
const { getUsers, getUser, createUser, deleteUser, updateUser } = require('../services/user');
const { createToken, checkAuth } = require('../utils/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/users', checkAuth(), async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get users');
  }
});

router.get('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get user');
  }
});

router.post('/users', async (req, res) => {
  try {
    const { email, password, username, roles } = req.body;
    const isEmailBusy = await User.findOne({ email });
    if (isEmailBusy) {
      return res.status(403).send('User with this email already exists');
    }
    const token = await createToken(email, password);
    const user = await createUser({ email, username, token, roles });
    return res.status(201).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not create user');
  }
});

router.delete('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(req.user, id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(403).send('you chat not delete this user');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not delete user');
  }
});

router.patch('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(req.user, id, req.body);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(403).send('you can not update this user');
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not update user');
  }
});

module.exports = router;