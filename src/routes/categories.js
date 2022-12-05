const { Router } = require('express');
const { body } = require('express-validator');
const { checkAuth } = require('../middlewares/checkAuth');
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
const { UserRoles } = require('../services/userServices');
const {
  validationErrorsHandler,
} = require('../middlewares/validationErrorsHandler');

router.get('/', async (req, res) => {
  try {
    const categories = await getCategories(req.query);
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .send('failed to find categories\nerror: ' + error.message);
  }
});

router.get(
  '/:id',
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    const id = req.params.id;
    try {
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
  }
);

router.post(
  '/',
  checkAuth(),
  validate(['title']),
  validationErrorsHandler,
  async (req, res) => {
    console.log(req.user);
    try {
      const category = await createCategory(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res
        .status(500)
        .send('failed to add category\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  checkAuth(),
  body('title', 'Should be string').isString().optional(),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      const category = await updateCategory(req.params.id, req.body);

      if (!category) {
        return res
          .status(404)
          .send(`Category id:"${req.params.id}" - Not found`);
      }

      return res.status(200).send('Category updated successfully');
    } catch (error) {
      return res
        .status(500)
        .send('failed to update category\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id',
  checkAuth([UserRoles.admin]),
  validateParamId(),
  validationErrorsHandler,
  async (req, res) => {
    try {
      await deleteCategory(req.params.id);
      return res.status(200).send('Category deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete category\nerror: ' + error.message);
    }
  }
);

module.exports = router;
