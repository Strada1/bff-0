const Comment = require('../models/CommentSchema');

const createComment = ({ text }) => {
    return Comment.create({ text });
}

const getByIdComment = (id) => {
    return Comment.findById(id);
}

const updateComment = ({ commentId, ...updates }) => {
    return Comment.findByIdAndUpdate(commentId, {...updates}, { new: true, rawResult: true });
}

const deleteComment = async (commentId) => {
    return Comment.findByIdAndDelete(commentId);
}

module.exports = {
    createComment, getByIdComment, updateComment, deleteComment
}