const createAuthData = (token) => {
  return { key: 'Authorization', value: 'Bearer ' + token };
};

module.exports = { createAuthData };