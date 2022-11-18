const { createModel } = require('../services/modelService');

const DirectorSchema = { name: String };

module.exports = createModel('Director', DirectorSchema);
