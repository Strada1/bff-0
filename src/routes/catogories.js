const { Router } = require('express');
const router = Router();
const {
  createCategory,
  findAllCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryServices');

router.get('/all', async (req, res) => {
  try {
    const categories = await findAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .send('failed to find categories\nerror: ' + error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const category = await findCategory(id);
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

router.put('/:id', async (req, res) => {
  try {
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

router.delete('/:id', async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    return res.status(200).send('Category deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete category\nerror: ' + error.message);
  }
});

module.exports = router;
