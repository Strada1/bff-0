const express = require('express');
const {movieRouter} = require('./routes');
const {connected} = require('./db');

const port = 3000;
const app = express();

connected('mongodb://localhost:27017/main')

app.use(express.json())

app.use('/', movieRouter)

app.listen(port, () => {
    console.log(`server run in ${port} port`)
})