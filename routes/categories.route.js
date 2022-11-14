const express = require('express');
const router = express.Router();
const Category = require('../models/categories.model');

router.post('/', async (req, res) => {
  try {
    const movie = await Category.create(req.body);
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await Category.collection.find().toArray();
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
