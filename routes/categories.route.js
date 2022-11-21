const express = require('express');
const router = express.Router();
const categoriesService = require('../services/categories.service');

router.get('/', async (req, res) => {
  try {
    const response = await categoriesService.getCategory();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await categoriesService.createCategory([
      {
        category: req.body.category,
      },
    ]);
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const response = await categoriesService.updateCategory(categoryId, {
      category: req.body.category,
    });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const response = await categoriesService.deleteCategory(req.params.id);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
