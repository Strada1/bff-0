require('dotenv').config(); //first import

const express = require('express');
const cors = require('cors');
const { ALLOWED_ORIGINS } = require('./utils');
const { router } = require('./router');

const app = express();

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
