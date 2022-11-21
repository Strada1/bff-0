const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const {
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

router.get('/categories', async (request, response) => {
  try {
    const categories = await getCategories().populate('category');

    response.status(200).send(categories);
  } catch (error) {
    console.log(error);
    response.status(500).send([]);
  }
});

router.post('/categories', async (request, response) => {
  try {
    const { category } = request.body;

    const result = await Category.create({
      category,
    });

    return response.status(201).send(result);
  } catch (error) {
    console.log(error);
    return response.status(500).send({});
  }
});

router.put('/categories/:categoryId', async (request, response) => {
  try {
    const { categoryId } = request.params;
    const category = await updateCategory(categoryId, request.body);

    response.status(200).send(category);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

router.delete('/categories/:categoryId', async (request, response) => {
  try {
    const { categoryId } = request.params;
    const deleted = await deleteCategory(categoryId);

    response.status(204).send(deleted);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

module.exports = router;
