const express = require('express');
const app = express();
const Movies = require('./routes/movies');
const Categories = require('./routes/categories');
const { SERVER_URL, PORT } = require('./settings');

app.use(express.json());
app.use(Movies, Categories);

app.listen(PORT, () => {
  console.log(`server running at ${SERVER_URL}:${PORT}`);
});
