const Comment = require('../models/CommentSchema');
const {getByIdMovie, updateMovie} = require("./movieService");

const createComment = ({ text }) => {
    return Comment.create({ text });
}

const getByIdComment = (id) => {
    return Comment.findById(id);
}

const updateComment = ({ commentId, ...updates }) => {
    return Comment.findByIdAndUpdate(commentId, {...updates}, { new: true, rawResult: true });
}

const deleteComment = async (commentId, movieId) => {
    const movie = await getByIdMovie(movieId);
    const comments = movie.comments.filter((item) => item._id.valueOf() !== commentId)
    await updateMovie({ movieId, comments });
    return Comment.findByIdAndDelete(commentId);
}

module.exports = {
    createComment, getByIdComment, updateComment, deleteComment
}