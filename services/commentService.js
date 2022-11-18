const CommentModel = require("../scheme/commentScheme");

const createComment = async (req, movie) => {
  const comment = await CommentModel.create({
    movie,
    ...req.body,
  });
  return comment;
};

module.exports = { createComment };
