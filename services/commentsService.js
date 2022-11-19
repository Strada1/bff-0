const Comment = require('../models/CommentSchema');

const createComment = ({ text }) => {
    return Comment.create({ text });
}

const findByIdComment = (id) => {
    return Comment.findById(id);
}

const updateComment = ({ id, ...updates }) => {
    return Comment.findByIdAndUpdate(id, {...updates}, { new: true, rawResult: true });
}

const deleteComment = (id) => {
    return Comment.findByIdAndDelete(id);
}

module.exports = {
    createComment, findByIdComment, updateComment, deleteComment
}