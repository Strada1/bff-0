const express = require('express');
const router = express.Router();
const {
  showAllComment,
  createComment,
  updateComment,
  deliteComment,
} = require('../services/commentService.js');

router.get('/all', async (req, res) => {
  try {
    const data = await showAllComment();
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await createComment(req.body);
    return res.status(201).send('comment adding');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await updateComment(req.body._id, req.body);
    return res.status(201).send('comment updated');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deliteComment(req.body);
    return res.status(201).send('comment delited');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
