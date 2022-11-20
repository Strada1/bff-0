require('dotenv').config();

const url = process.env.MONGO_CONNECTION_URL;
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const MovieSchema = new mongoose.Schema({
	title: String,
	category: { type: 'ObjectId', ref: 'Category' },
	director: { type: 'ObjectId', ref: 'Director' },
	year: Number,
	duration: Number,
	rating: Number,
	comments: [
		{
			type: 'ObjectId',
			ref: 'Comment',
		},
	],
});

const CategorySchema = new mongoose.Schema({
	title: String,
});

const CommentSchema = new mongoose.Schema({
	text: String,
	movieId: {
		ref: 'Movie',
		type: 'ObjectId',
	},
});

const DirectorSchema = new mongoose.Schema({
	name: String,
	surname: String,
});

module.exports.Movie = mongoose.model('Movie', MovieSchema);
module.exports.Category = mongoose.model('Category', CategorySchema);
module.exports.Comment = mongoose.model('Comment', CommentSchema);
module.exports.Director = mongoose.model('Director', DirectorSchema);
