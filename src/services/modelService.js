const mongoose = require('mongoose');

function createModel(name, schemaObject) {
  const modelSchema = new mongoose.Schema(schemaObject);
  return mongoose.model(name, modelSchema);
}

module.exports.createModel = createModel;
