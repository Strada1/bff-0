const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Movie = createMovieModel();
const Category = createCategoryModel();

module.exports.Movie = Movie;
module.exports.Category = Category;

function createMovieModel() {
	const MovieSchema = new mongoose.Schema({
		title: String,
		category: String,
		year: Number,
		duration: Number,
		rating: Number,
	});

	return mongoose.model('Movie', MovieSchema);
}

function createCategoryModel() {
	const CategorySchema = new mongoose.Schema({
		title: String,
	});

	return mongoose.model('Category', CategorySchema);
}
