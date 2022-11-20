require('dotenv').config();
const app = require('./src/app.js');
const createRoutes = require('./src/routes.js');

const port = process.env.PORT;

createRoutes();

app.listen(port, () => {
	console.log('example work');
});
