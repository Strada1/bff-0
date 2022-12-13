const getAuthorizationData = (token) => {
  return { key: 'Authorization', value: 'Bearer ' + token };
};

module.exports = getAuthorizationData;
