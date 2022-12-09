const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R0b2tlbkBtYWlsLnJ1IiwicGFzc3dvcmQiOiJmb3J0b2tlbiIsImlhdCI6MTY2OTgxMDk0NX0.Q-DnpjSQqNbxSkTMXPthM7wC_rgp-muiuevbozHrYns';

const clientToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R0b2tlbjJAbWFpbC5ydSIsInBhc3N3b3JkIjoiZm9ydG9rZW4yIiwiaWF0IjoxNjY5ODExNTEyfQ.ogbzZ19D95DZIRtLektRGakhfN-MaXsjU9Hw3GDF4mw';

const adminAuthData = {
  key: 'Authorization',
  data: 'Bearer ' + adminToken
};

const clientAuthData = {
  key: 'Authorization',
  data: 'Bearer ' + clientToken
};

module.exports = { adminToken, clientToken, adminAuthData, clientAuthData };