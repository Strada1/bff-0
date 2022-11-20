// module.exports = createRoutes;

const { Movie } = require('../models');

async function getMovies() {
	return Movie.find();
}

async function createMovie(req) {
	return Movie.create(req.body);
}

async function getMovie(req) {
	return Movie.findById(req.params.movieId)
		.populate('director', 'name surname')
		.populate('category', 'title')
		.populate('comments', 'text');
}

async function deleteMovie(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	return await Movie.findByIdAndDelete(req.params.movieId);
}

async function changeMovie(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	return await Movie.findByIdAndUpdate(req.params.movieId, req.body);
}

module.exports = {
	getMovies,

	createMovie,
	getMovie,
	deleteMovie,
	changeMovie,
};
