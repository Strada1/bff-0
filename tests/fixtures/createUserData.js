const createUserData = (isWrongData = false) => {
  const user = {
    email: 'testForJestUser@gmail.com',
    username: 'jestTestUser',
  };

  if (isWrongData) {
    user.email = 123;
    user.username = 321;
  }

  return user;
};

module.exports = createUserData;
