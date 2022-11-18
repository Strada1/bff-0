const { CATEGORY } = require('../services/categoryService');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await CATEGORY.CREATE(req.body);
    return res.status(201).send('category created');
  } catch (e) {
    return res.status(500).send('error');
  }
});

router
  .route('/:categoryId')
  .get(async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      CATEGORY.GET(categoryId, (error, category) => {
        if (error) throw new Error('Read Error');
        return res.status(201).send(category);
      });
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .delete(async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      await CATEGORY.DELETE(categoryId);
      return res.status(201).send(`category ${categoryId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .put(async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      await CATEGORY.UPDATE(categoryId, req.body);
      return res.status(201).send(`category ${categoryId} changed`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

module.exports = router;
