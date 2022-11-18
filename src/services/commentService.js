const Comment = require('../models/commentModel');

const COMMENT = {
  GET: (id, callback) => {
    return Comment.findById(id, callback);
  },
  DELETE: (id) => {
    return Comment.findByIdAndDelete(id);
  },
  UPDATE: (id, update) => {
    return Comment.findByIdAndUpdate(id, update);
  },
  CREATE: (commentObject) => {
    return Comment.create(commentObject);
  },
};

module.exports.COMMENT = COMMENT;
