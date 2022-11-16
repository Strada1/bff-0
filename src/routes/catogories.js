const Category = require('../models/Category.js');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  try {
    await Category.create(req.body);
    return res.status(201).send('category created');
  } catch (error) {
    console.log(error);
    return res.status(500).send('failed to add category');
  }
});

module.exports = router;
