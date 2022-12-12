require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

module.exports = app.listen(port, async () => {
    console.log(`app listening on port ${port}`);
});