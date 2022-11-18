const Comment = require('../models/Comment')

const getComments = (movieId) => {
    return Comment.find({ movie: movieId }).lean().populate('movie')
}
const getComment = (commentId) => {
    return Comment.findById({ _id: commentId }).lean().populate('movie')
}

const createComment = ({ text, author, movie }) => {
    return Comment.create({ text, author, movie })
}

const deleteComment = (commentId) => {
    return Comment.findByIdAndDelete({ _id: commentId }).lean()
}

const deleteComments = (movieId) => {
    return Comment.deleteMany({ movie: movieId }).lean()
}

const updateComment = (commentId, newData) => {
    return Comment.findByIdAndUpdate(
        { _id: commentId },
        { ...newData, updatedAt: Date.now() }
    ).lean()
}

module.exports = {
    getComment,
    getComments,
    createComment,
    deleteComment,
    deleteComments,
    updateComment,
}
