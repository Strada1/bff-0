const app = require('./app.js');
const models = require('./models.js');

function createRoutes() {
	app.post('/movies', async (req, res) => {
		try {
			await models.Movie.create(req.body);
			return res.status(201).send('movie created');
		} catch (error) {
			return res.status(500).send('some Error');
		}
	});

	app.post('/category', async (req, res) => {
		try {
			await models.Category.create(req.body);
			return res.status(201).send('category created');
		} catch (error) {
			return res.status(500).send('some Error');
		}
	});
}

module.exports = createRoutes;
