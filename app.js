const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

const connectDataBase = require('./connectDataBase');
const {router} = require("./router/router");

const { MONGO_CONNECTION_STRING, PORT } = dotenv.config().parsed

const app = express();
app.use(express.json());

const allowedOrigins = [
    ''
];

app.use(cors({
    origin: allowedOrigins
}));

connectDataBase(MONGO_CONNECTION_STRING);

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
