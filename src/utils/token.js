const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

class Service {
  encrypt = async ( { email, password } ) => {
    const token = await jwt.sign({ email, password }, secretKey);
    return token;
  };
  decrypt = async ( token ) => {
    const payload = await jwt.verify(token, secretKey);
    return payload;
  };
}

const tokenService = new Service();

module.exports = { tokenService };
