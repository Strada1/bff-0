const express = require('express');
const router = express.Router();

const commentsService = require('../services/comments.service');

router.get('/', async (req, res) => {
  try {
    const comments = await commentsService.getComments();
    return res.status(200).send(comments);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const idComment = req.params.id;
    const comment = await commentsService.updateComments(idComment, {
      description: req.body.description,
    });
    return res.status(201).send(comment);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idComment = req.params.id;
    const comment = await commentsService.deleteComments(idComment);
    return res.status(200).send(comment);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
