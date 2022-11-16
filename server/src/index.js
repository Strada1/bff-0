const express = require('express');
const mongoose = require('mongoose');
const allRoutings = require('./routes');
const { DB_URL_MAIN, DB_MAIN_OPTIONS } = require('./db');

const app = express();
const port = 3000;
const host = '127.0.0.1';
app.use(express.json());

mongoose.connect(DB_URL_MAIN, DB_MAIN_OPTIONS);

allRoutings(app);

app.listen(port, host);
