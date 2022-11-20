const { Comment, Movie } = require('../models');
const { getMovie } = require('./movieServices');

async function addComment(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	const comment = await Comment.create({
		...req.body,
		movieId: req.params.movieId,
	});

	const oldComments = movie.comments;

	const newComment = [...oldComments, comment._id];

	return await Movie.findByIdAndUpdate(req.params.movieId, {
		comments: newComment,
	});
}

async function getComment(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		return false;
	}

	return comment;
}

async function deleteComment(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		return false;
	}

	const comments = [...movie.comments];

	let indexComment = 0;

	comments.forEach((comment, index) => {
		console.log(comment);
		if (comment._id === req.params.commentId) {
			indexComment = index;
		}
	});

	comments.splice(indexComment, 1);

	await Movie.findByIdAndUpdate(req.params.movieId, {
		comments,
	});

	return await Comment.findByIdAndDelete(req.params.commentId);
}

async function changeComment(req) {
	const movie = await getMovie(req);

	if (!movie) {
		return false;
	}

	const comment = await Comment.findById(req.params.commentId);

	if (!comment) {
		return false;
	}

	return await Comment.findByIdAndUpdate(req.params.commentId, req.body);
}

module.exports = {
	addComment,
	getComment,
	deleteComment,
	changeComment,
};
