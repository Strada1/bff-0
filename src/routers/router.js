const express = require('express');
const { movieApp } = require('./movie-routes');
const { categoryApp } = require('./category-routes');

const routerApp = express();

routerApp.use(movieApp);
routerApp.use(categoryApp);

module.exports = { routerApp };
