export const dataForNewUser = {
  email: "test@test.ru",
  password: "somepass",
  username: "test_user",
};

export const alreadyUsedDataForUser  = {
  email: "admin@test.ru",
  username: "admin",
};

export function getUserId(isValid = true) {
  return isValid ? '638b1cc9b54bda9457b3f48e' : '638b1cc9b54bda9457b3f999';
}

export const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QucnUiLCJwYXNzd29yZCI6InF3ZXJ0eSIsImlhdCI6MTY3MDgwNzA5OSwiZXhwIjoxNjczMzk5MDk5fQ.BIIuHU2s319N_sLQxaMHdPNLIGii8yxR0IzZ1uZEwYY';