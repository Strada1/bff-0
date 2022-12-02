import { Router } from 'express';
import ApiError from '../exceptions/apiError.js';

import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  pullCategories,
  addCategory,
  pullCategory,
} from '../services/category.js';

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body;
    const { movieId } = req.query;

    const category = await createCategory(title);

    if (movieId) {
      await addCategory(category._id, movieId);
    }

    return res.status(201).send(category);
  } catch (err) {
    next(err);
  }
});

router.get('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await getCategory(categoryId);

    if (!category) {
      return next( ApiError.NotFound('No category for this ID') );
    }

    return res.status(200).send(category);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { sort } = req.query;
    const categories = await getCategories(sort);

    return res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
});

router.put('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title } = req.body;
    const updatedCategory = await updateCategory(categoryId, title);

    if (!updatedCategory) {
      return next( ApiError.NotFound('No category for this ID') );
    }

    return res.status(200).send(updatedCategory);
  } catch (err) {
    next(err);
  }
});

router.delete('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await deleteCategory(categoryId);

    if (!deletedCategory) {
      return next( ApiError.NotFound('No category for this ID') );
    }

    const { movieId } = req.query;

    if (movieId) {
      await pullCategory(categoryId, movieId);
    } else {
      await pullCategories(categoryId);
    }

    return res.status(200).send(deletedCategory);
  } catch (err) {
    next(err);
  }
});

export default router;
