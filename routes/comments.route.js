const express = require('express');
const router = express.Router();

const commentsService = require('../services/comments.service');

router.get('/', async (req, res) => {
  try {
    const response = await commentsService.getComments();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await commentsService.updateComments(
      req.params.id,
      req.body
    );
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await commentsService.deleteComments(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
