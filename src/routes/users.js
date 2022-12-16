const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not get users');
  }
});

router.get('/users/:id', async (req, res) => {
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
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not create user');
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not delete user');
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('can not update user');
  }
});

module.exports = router;