const { validate } = require('../middlewares/validate');
const { sanitize } = require('../middlewares/sanitize');

module.exports.validate = validate;
module.exports.sanitize = sanitize;
