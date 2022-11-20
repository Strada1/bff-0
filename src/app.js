const express = require('express');
const cors = require('cors');
const allowedOrigins = [
	'localhost', // один или несколько хостов
];

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: allowedOrigins,
	})
);

module.exports = app;
