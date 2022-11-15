const express = require('express');
const { routerApp } = require('./routers/router');

const app = express();

app.use(express.json());
app.use(routerApp);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
