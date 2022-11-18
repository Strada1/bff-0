const { createModel } = require('../services/modelService');

const MovieSchema = {
  title: String,
  directorId: { type: 'ObjectId', ref: 'Director' },
  category: { type: 'ObjectId', ref: 'Category' },
  year: Number,
  rating: Number,
  duration: Number,
};

module.exports = createModel('Movie', MovieSchema);
