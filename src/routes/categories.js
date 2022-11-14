const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router
  .route('/categories')
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
      console.log(error);
      response.status(400).send({});
    }
  })
  .put(async (request, response) => {
    response.send('put categories');
  })
  .delete(async (request, response) => {
    response.send('delete categories');
  });

module.exports = router;
