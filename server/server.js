require('./connectDatabase')();

const express = require('express');
const cors = require('cors');

const router = require('./router/');

const app = express();
const PORT = 3000;

const allowedOrigins = [
  'http://localhost:8000',
  'http://localhost:63342',
];

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});
