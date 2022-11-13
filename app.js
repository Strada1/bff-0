const express = require('express');
const connectDataBase = require('./connectDataBase');
const {PORT, URL} = require('./constant/constant')
const movies = require("./router/movies");
const categories = require("./router/categories");

const app = express();
app.use(express.json());

connectDataBase(URL);

app.use('/api', movies);
app.use('/api', categories);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
