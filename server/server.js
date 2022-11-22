const express = require('express');
const cors = require('cors');

const router = require('./router/');
const app = express();

require('dotenv').config();
require('./connectDB').connect();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const allowedOrigins = [
  CLIENT_URL,
];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});
