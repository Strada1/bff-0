const { movieController } = require('../controllers');
const express = require('express');

const movieApp = express();

movieApp.get('/movies', movieController.get);
movieApp.post('/movies', movieController.create);

module.exports = { movieApp };
