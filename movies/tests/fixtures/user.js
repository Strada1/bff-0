const user = {
  _id: '63874d3861bdd7d623f566b2',
  email: 'testtoken2@mail.ru',
  password: 'fortoken2',
  roles: ['client'],
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R0b2tlbjJAbWFpbC5ydSIsInBhc3N3b3JkIjoiZm9ydG9rZW4yIiwiaWF0IjoxNjY5ODExNTEyfQ.ogbzZ19D95DZIRtLektRGakhfN-MaXsjU9Hw3GDF4mw'
};

const invalidUser = {
  _id: '093485kdjfkls',
  email: 'invalidemail',
  password: '123'
};

module.exports = { user, invalidUser };