const {deleteComment} = require("./commentsService");
const {getByIdMovie, updateMovie, deleteMovie} = require("./movieService");

const deleteMovieWithComment = async (id) => {
    const { comments } = await getByIdMovie(id);

    const hasComment = comments.length !== 0;
    if (hasComment) {
        for (let i = 0; i < comments.length; ++i) {
            const id = comments[i]._id.valueOf()
            await deleteComment(id);
        }
    }
    return deleteMovie(id);
}

const deleteCommentInMovie = async (commentId, movieId) => {
    const movie = await getByIdMovie(movieId);
    const comments = movie.comments.filter((item) => item._id.valueOf() !== commentId)
    await updateMovie({ movieId, comments });
    return deleteComment(commentId);
}

module.exports = {
    deleteMovieWithComment, deleteCommentInMovie
}