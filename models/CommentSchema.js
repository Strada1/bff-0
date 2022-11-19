const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: String,
});

module.exports = mongoose.model('Comment', CommentSchema);