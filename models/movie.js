const mongoose = require('mongoose');
const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  year: Number,
  duration: Number,
  director: { type: Schema.Types.ObjectId, ref: 'Director' },
  rating: Number,
});

module.exports = mongoose.model('Movie', MovieSchema);
