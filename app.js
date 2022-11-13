const express = require('express');
const app = express();
const PORT = 3001;
const addRoutes = require('./routes.js');

const start = async () => {};

app.use(express.json());

addRoutes(app);

app.listen(PORT, () => {
  console.log('App listening port:', PORT);
  console.log(`http://127.0.0.1:${PORT}`);
});

start().catch(console.log);
