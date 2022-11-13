const express = require('express');
const router = express.Router();
const { ROUTES } = require('../settings');
const Category = require('../models/Category');

router
  .route(`/${ROUTES.CATEGORIES}`)
  .get(async (request, response) => {
    response.send('get categories');
  })
  .post(async (request, response) => {
    try {
      const { category } = request.body;

      const result = await Category.create({
        category,
      });

      return response.status(201).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  })
  .put(async (request, response) => {
    response.send('put categories');
  })
  .delete(async (request, response) => {
    response.send('delete categories');
  });

module.exports = router;
