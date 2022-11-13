const app = require('./src/app.js');
const createRoutes = require('./src/routes.js');

const port = 3000;

createRoutes();

app.listen(port, () => {
	console.log('example work');
});
