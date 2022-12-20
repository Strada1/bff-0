import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import router from './router/router.js';
import connectDB from './connectDB.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();

const {
  PORT = 3000,
  CLIENT_URL,
  MONGO_CONNECTION_STRING,
} = process.env;

connectDB(MONGO_CONNECTION_STRING);

const allowedOrigins = [CLIENT_URL];

app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware);

const serverListener = app.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

export { app, serverListener };
