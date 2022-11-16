const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: 'ObjectId',
    ref: 'Category',
  },
  year: Number,
  duration: Number,
  director: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
