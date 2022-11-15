const express = require('express');
const app = express();
const cors = require('cors');
const Movies = require('./routes/movies');
const Categories = require('./routes/categories');
const { SERVER_URL, PORT, ALLOWED_ORIGINS } = require('./settings');

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  }),
  express.json()
);
app.use(Movies, Categories);

app.listen(PORT, () => {
  console.log(`server running at ${SERVER_URL}:${PORT}`);
});
