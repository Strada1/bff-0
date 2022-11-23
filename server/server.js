import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import router from './router/index.js';
import connectDB from './connectDB.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

connectDB(MONGO_CONNECTION_STRING);

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
