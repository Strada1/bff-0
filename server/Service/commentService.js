const CommentModel = require("../models/comment");

module.exports = {
    createNewComment: async body => {
        const comment = new CommentModel(body);
        const result = await comment.save();
        return result;
    },

    findCommentById: async id => {
        const comments = await CommentModel.findById(id);
        return comments;
    },

    findCommentsByMovieId: async id => {
        const comments = CommentModel.find({movieId: id});
        return comments;
    },

    updateComment: async (id, updates, options) => {
        const comment = await CommentModel.findByIdAndUpdate(id, updates, options);
        return comment;
    },

    deleteComment: async id => {
        const comment = await CommentModel.findByIdAndDelete(id);
        return comment;
    }
};
