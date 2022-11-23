import Comment from '../models/Comment.js';
import Movie from '../models/Movie.js';

export function createComment({ author, text, movie }) {
  return Comment.create({ author, text, movie });
}

export function getComment(id) {
  return Comment.findById(id).populate('movie');
}

export function getComments(movieId) {
  if (movieId) {
    return Comment.find({ movie: movieId });
  }
  return Comment.find();
}

export function updateComment(id, { author, text }) {
  return Comment.findByIdAndUpdate(id, { author, text }, {
    new: true,
  });
}

export function deleteComment(id) {
  return Comment.findByIdAndDelete(id);
}

export function addComment(commentId, movieId) {
  return Movie.findByIdAndUpdate(movieId, {
    $push: { comments: commentId },
  });
}

export function pullComment(commentId, movieId) {
  return Movie.findByIdAndUpdate(movieId, {
    $pull: { comments: commentId },
  });
}

export async function deleteComments(movieId) {
  const { deletedCount } = await Comment.deleteMany({ movie: movieId });
  return deletedCount;
}