const CommentModel = require("../models/comment");

module.exports = {
    createNewComment: async body => {
        const comment = new CommentModel(body);
        const result = await comment.save();

        return result;
    }
};
