const { param } = require('express-validator');

const validateParamId = () => {
  return param('id', 'Param id should be ObjectId').isMongoId();
};

module.exports = validateParamId;
