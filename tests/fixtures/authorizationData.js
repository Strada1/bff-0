const adminToken = require('./adminToken');

const adminAuthorizationData = {
  key: 'Authorization',
  data: 'Bearer ' + adminToken,
};

module.exports = adminAuthorizationData;
