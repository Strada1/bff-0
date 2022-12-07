const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

const connectDataBase = require('./helpers/connectDataBase');
const readerFS = require("./helpers/readerFS");
const { router } = require("./router/router");

const { MONGO_CONNECTION_STRING, PORT } = dotenv.config().parsed;
const path = './movies.json';

const app = express();
app.use(express.json());

const allowedOrigins = [
    ''
];

app.use(cors({
    origin: allowedOrigins
}));

connectDataBase(MONGO_CONNECTION_STRING).then(console.log);
// readerFS(path)

app.use('/api', router);

module.exports = app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
