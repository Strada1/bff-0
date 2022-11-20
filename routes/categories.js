const express = require('express');
const router = express.Router();
const {
  showAllCategories,
  createCategory,
  updateCategory,
  deliteCategory,
} = require('../services/categoryService.js');

router.get('/all', async (req, res) => {
  try {
    const data = await showAllCategories();
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await createCategory(req.body);
    return res.status(201).send('Categories adding');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await updateCategory(req.body._id, req.body);
    return res.status(201).send('Category updated');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deliteCategory(req.body);
    return res.status(201).send('Category deleted');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
