require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const ip = require('ip');

const allowedOrigins = ['semastep.com', 'semastep-monchegorsk.ru'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,POST,DELETE',
  })
);

app.use(express.json());

const appListener = app.listen(PORT, () => {
  console.log('App listening port:', PORT);
  console.log(`http://${ip.address()}:${PORT}`);
});

module.exports = appListener;