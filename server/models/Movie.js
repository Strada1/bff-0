const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  duration: Number,
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

module.exports = mongoose.model('Movie', MovieSchema);
