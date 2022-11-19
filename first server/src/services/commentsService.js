const {Comments} = require("../schemas");

function createComment(options) {
    return Comments.create(options)
}

function findComments(filmId) {
    return Comments.find({film: filmId}).lean()
}

function findByIdAndUpdateComment(id, options) {
    return Comments.findByIdAndUpdate(id, options).lean()
}
function deleteComment(id) {
    return Comments.findByIdAndDelete(id).lean()
}

module.exports = {createComment, findComments, findByIdAndUpdateComment, deleteComment}