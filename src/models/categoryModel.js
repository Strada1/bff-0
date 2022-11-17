const { createModel } = require('../services/modelService');

const CategorySchema = { title: String };

module.exports = createModel('Category', CategorySchema);
