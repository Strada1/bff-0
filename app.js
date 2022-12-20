const express = require('express');
const cors = require("cors");

const connectDataBase = require("./helpers/connectDataBase");
const router = require("./router/router");

const dotenv = require('dotenv');
const { MONGO_CONNECTION_STRING, PORT } = dotenv.config().parsed;

const app = express();
app.use(express.json());

const allowedOrigins = [
    ''
];

app.use(cors({
    origin: allowedOrigins
}));

app.use('/api', router);

connectDataBase(MONGO_CONNECTION_STRING).then(console.log);

module.exports = app.listen(PORT, () => {
    console.log(`Port: ${PORT}`);
})
