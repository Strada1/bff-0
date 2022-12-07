const adminToken = require('./adminToken');

const adminAuthorizationData = {
  key: 'Authorization',
  data: 'Bearer ' + adminToken,
};

const getAuthorizationData = (token) => ({
  key: 'Authorization',
  data: 'Bearer '+ token,
});

module.exports = {adminAuthorizationData, getAuthorizationData};
