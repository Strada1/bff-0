const Comment = require('../models/Comment')

const getComments = (movieId) => {
    return Comment.find({ movie: movieId })
}
const getComment = (commentId) => {
    return Comment.findById({ _id: commentId })
}

const createComment = ({ text, author, movie }) => {
    return Comment.create({ text, author, movie })
}

const deleteComment = (commentId) => {
    return Comment.findByIdAndDelete({ _id: commentId })
}

const deleteComments = (movieId) => {
    return Comment.deleteMany({movie: movieId})
}

const updateComment = (commentId, newData) => {
    return Comment.findByIdAndUpdate(
        { _id: commentId },
        { ...newData, updatedAt: Date.now() }
    )
}

module.exports = {
    getComment,
    getComments,
    createComment,
    deleteComment,
    deleteComments,
    updateComment,
}
