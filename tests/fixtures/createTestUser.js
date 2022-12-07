const createTestUser = (invalidValues = false) => {
  const user = {
    email: 'testexample@example.com',
    username: 'exampleUserName',
    password: 'examplePassword',
  };

  if (invalidValues) {
    user.email = 'askdfj';
    user.username = 13;
    user.password = '12';
  }

  return user;
};

module.exports = createTestUser;
