const express = require('express');
const app = express();
const PORT = 3001;
const addRoutes = require('./routes/routes.js');
const ip = require("ip");

const start = async () => {};

app.use(express.json());

addRoutes(app);

app.listen(PORT, () => {
  console.log('App listening port:', PORT);
  console.log(`http://${ip.address()}:${PORT}`);
});

start().catch(console.log);
