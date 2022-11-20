require('dotenv').config(); //first import

const express = require('express');
const cors = require('cors');
const { ALLOWED_ORIGINS } = require('./utils');
const { router } = require('./router');

const app = express();

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
