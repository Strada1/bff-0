require('dotenv').config();
const express = require('express');
const cors = require('cors');
const useRoutes = require('./routes');
// const { uploadMoviesToDB } = require('./services/uploadFromFile')
const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  `http://localhost:${port}`
];

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

useRoutes(app);

app.listen(port, async () => {
  // await uploadMoviesToDB('movies.json')
  console.log(`app listening on port ${port}`);
});
