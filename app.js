require('./connect');

const express = require('express');
const addRoutes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

const allowedOrigins = ['http://example.com'];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.use(express.json());

addRoutes(app);
