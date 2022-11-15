const { categoryController } = require('../controllers');
const express = require('express');

const categoryApp = express();

categoryApp.post('/categories', categoryController.create);

module.exports = { categoryApp };
