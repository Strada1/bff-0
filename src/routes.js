const app = require('./app.js');
const {
	addCategory,
	getCategory,
	deleteCategory,
	changeCategory,
} = require('./services/categoryServices.js');
const {
	addComment,
	getComment,
	deleteComment,
	changeComment,
} = require('./services/commentService.js');
const {
	addDirector,
	getDirector,
	deleteDirector,
	changeDirector,
} = require('./services/directorService.js');
const {
	getMovies,

	createMovie,
	getMovie,
	deleteMovie,
	changeMovie,
} = require('./services/movieServices.js');

/*
23:23 - 23:39 - 16
19:34 - 19:42 - 8
20:21 - 


*/

function createRoutes() {
	//movies
	app.get('/movies', async (req, res) => {
		try {
			const movies = await getMovies();
			return res.status(201).send(movies);
		} catch (error) {
			return res.status(500).send('Error');
		}
	});

	//movie
	{
		app.post('/movies', async (req, res) => {
			try {
				await createMovie(req);
				return res.status(201).send('movie created');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.get('/movies/:movieId', async (req, res) => {
			try {
				const movie = await getMovie(req);
				return res.status(201).send(movie);
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.delete('/movies/:movieId', async (req, res) => {
			try {
				const isMovieFound = await deleteMovie(req);

				if (!isMovieFound) {
					return res.status(400).send('film not found');
				}

				return res.status(200).send('deleted');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.put('/movies/:movieId', async (req, res) => {
			try {
				const isMovieFound = await changeMovie(req);

				if (!isMovieFound) {
					return res.status(400).send('film not found');
				}

				return res.status(200).send('updated');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
	}

	//category
	{
		app.post('/category', async (req, res) => {
			try {
				await addCategory(req);
				return res.status(201).send('category created');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.get('/category/:categoryId', async (req, res) => {
			try {
				const category = await getCategory(req);
				return res.status(201).send(category);
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.delete('/category/:categoryId', async (req, res) => {
			try {
				const isCategoryFound = await deleteCategory(req);

				if (!isCategoryFound) {
					return res.status(400).send('category not found');
				}

				return res.status(200).send('deleted');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.put('/category/:categoryId', async (req, res) => {
			try {
				const isCategoryFound = await changeCategory(req);

				if (!isCategoryFound) {
					return res.status(400).send('category not found');
				}

				return res.status(200).send('updated');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
	}

	//comment
	{
		app.post('/movies/:movieId/comments', async (req, res) => {
			try {
				await addComment(req);
				return res.status(201).send('comment created');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.get('/movies/:movieId/comments/:commentId', async (req, res) => {
			try {
				const isMovieFound = await getComment(req);

				if (!isMovieFound) {
					return res.status(400).send('movie not found');
				}

				return res.status(201).send('comment created');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.delete('/movies/:movieId/comments/:commentId', async (req, res) => {
			try {
				const isCommentOrMovieFound = await deleteComment(req);

				if (!isCommentOrMovieFound) {
					return res.status(400).send('comment or movie not found');
				}

				return res.status(200).send('deleted');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.put('/movies/:movieId/comments/:commentId', async (req, res) => {
			try {
				const isCommentOrMovieFound = await changeComment(req);

				if (!isCommentOrMovieFound) {
					return res.status(400).send('comment or movie not found');
				}

				return res.status(200).send('updated');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
	}

	//director
	{
		app.post('/directors', async (req, res) => {
			try {
				await addDirector(req);
				return res.status(201).send('category created');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.get('/directors/:directorId', async (req, res) => {
			try {
				const director = await getDirector(req);
				return res.status(201).send(director);
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.delete('/directors/:directorId', async (req, res) => {
			try {
				const isDirectorFound = await deleteDirector(req);

				if (!isDirectorFound) {
					return res.status(400).send('director not found');
				}

				return res.status(200).send('deleted');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
		app.put('/directors/:directorId', async (req, res) => {
			try {
				const isDirectorFound = await changeDirector(req);

				if (!isDirectorFound) {
					return res.status(400).send('director not found');
				}

				return res.status(200).send('updated');
			} catch (error) {
				return res.status(500).send('Error');
			}
		});
	}

	// app.post('/movies/:movieId/comments', async (req, res) => {
	// 	try {
	// 		const isMovieFound = await addCommentsToMovie(req);

	// 		if (!isMovieFound) {
	// 			return res.status(400).send('film not found');
	// 		}

	// 		return res.status(201).send('comment created');
	// 	} catch (error) {
	// 		return res.status(500).send('Error');
	// 	}
	// });
}

module.exports = createRoutes;
