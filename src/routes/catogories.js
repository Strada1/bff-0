const { Router } = require('express');
const { validationResult } = require('express-validator');
const validate = require('../middlewares/validate');
const validateParamId = require('../middlewares/validateParamId');
const router = Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryServices');

router.get('/', async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .send('failed to find categories\nerror: ' + error.message);
  }
});

router.get('/:id', validateParamId(), async (req, res) => {
  const id = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await getCategory(id);
    if (!category) {
      return res.status(404).send(`Category id:${id} - not found`);
    }
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .send(`failed to find category ${id}\nerror: ` + error.message);
  }
});

router.post('/', validate(['title']), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res
      .status(500)
      .send('failed to add category\nerror: ' + error.message);
  }
});

router.put('/:id', validateParamId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await updateCategory(req.params.id, req.body);

    if (!category) {
      return res.status(404).send(`Category id:"${req.params.id}" - Not found`);
    }

    return res.status(200).send('Category updated successfully');
  } catch (error) {
    return res
      .status(500)
      .send('failed to update category\nerror: ' + error.message);
  }
});

router.delete('/:id', validateParamId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await deleteCategory(req.params.id);
    return res.status(200).send('Category deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete category\nerror: ' + error.message);
  }
});

module.exports = router;
