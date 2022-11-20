const Comment = require('../models/comment.js');

//the work is not finished yet

const createComment = ({ userName, text, movie }) => {
  return Comment.create({ userName, text, movie });
};

const showAllComment = () => {
  return Comment.find({}).lean().populate();
};

const updateComment = (_id, { text }) => {
  return Comment.findByIdAndUpdate(
    _id,
    { text },
    {
      new: true,
    }
  );
};

const deliteComment = ({ _id }) => {
  return Comment.findByIdAndDelete({ _id });
};

module.exports = {
  createComment,
  showAllComment,
  updateComment,
  deliteComment,
};
