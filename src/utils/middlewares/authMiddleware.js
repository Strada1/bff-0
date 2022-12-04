const { User } = require('../../models/user');

const authMiddleware = async ( req, res, next ) => {
  const authToken = req.header('Authorization');
  const [ email, password ] = authToken.split(' ');

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(403).send('Invalid token');
  }

  next();
};

module.exports = { authMiddleware };
