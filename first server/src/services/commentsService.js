const {Comments} = require("../schemas");

function createComment(options) {
    return Comments.create(options)
}

module.exports = {createComment}