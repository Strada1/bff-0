const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { userRoles } = require('../services/user');
const { passport } = require('./passport');

const createToken = (email, password) => {
  return jwt.sign({ email, password }, process.env.JWT_SECRET);
};

const getUserByToken = async (token) => {
  const user = await User.findOne({ token });
  if (!user) return undefined;
  return user;
};

const checkRole = (role) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserByToken(token);
    const isRightsEnough = (user && user.roles.includes(userRoles[role]));
    if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights');
    next();
  };
};
const checkAuth = (roles) => async (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    try {
      if (!user || err) {
        return res.status(401).send('Authentication failed');
      }
      if (Array.isArray(roles)) {
        for (const role of roles) {
          if (!user.roles.includes(role)) {
            return res
              .status(401)
              .send('You are not authorized to perform this action');
          }
        }
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .send('Internal server error\nerror' + error.message);
    }
  })(req, res, next);
};


module.exports = { createToken, checkRole, checkAuth };