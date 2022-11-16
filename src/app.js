const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3001;
const addRoutes = require('./routes/routes.js');
const ip = require('ip');

const allowedOrigins = ['semastep.com', 'semastep-monchegorsk.ru'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,POST,DELETE',
  })
);

app.use(express.json());

addRoutes(app);

app.listen(PORT, () => {
  console.log('App listening port:', PORT);
  console.log(`http://${ip.address()}:${PORT}`);
});
