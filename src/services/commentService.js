const Comment = require('../models/commentModel');

const COMMENT = {
  CREATE: ({ comment, movieId }) => {
    return Comment.create({ comment, movieId });
  },
};

module.exports.COMMENT = COMMENT;
