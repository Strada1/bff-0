const { Router } = require('express');
const router = Router();
const { createCategory } = require('../services/categoryServices');

router.post('/', async (req, res) => {
  try {
    const category = await createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .send('failed to add category\nerror: ' + error.message);
  }
});

module.exports = router;
