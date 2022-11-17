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
  .delete(async (req, res) => {
    try {
      await CATEGORY.DELETE(req.params.categoryId);
      return res.status(201).send(`category ${req.params.categoryId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .put(async (req, res) => {
    try {
      await CATEGORY.UPDATE(req.params.categoryId, req.body);
      return res.status(201).send(`category ${req.params.categoryId} changed`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

module.exports = router;
