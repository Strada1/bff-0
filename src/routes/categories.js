const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/categories', async (request, response) => {
  response.send('get categories');
});

router.post(async (request, response) => {
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
});

router.put(async (request, response) => {
  response.send('put categories');
});

router.delete(async (request, response) => {
  response.send('delete categories');
});

module.exports = router;
