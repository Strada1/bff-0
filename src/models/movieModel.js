const { createModel } = require('../services/modelService');

const MovieSchema = {
  title: String,
  direction: String,
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  rating: Number,
  duration: Number,
};

module.exports = createModel('Movie', MovieSchema);
