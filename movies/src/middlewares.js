const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const User = require('./models/User');
const { getUserByToken, userRoles } = require('./services/userService');

const validate = (requiredFields) => {
  return (req, res, next) => {
    let isValid = true;
    const missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        isValid = false;
        missingFields.push(field);
      }
    }
    if (!isValid) {
      return res.status(400).send(`Validation is failed, missing required fields: ${missingFields}`);
    }
    next();
  };
};

const usePassport = () => {
  passport.use(new BearerStrategy(
    function(token, done) {
      User.findOne({ token: token }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      });
    }
  ));
};

const checkIsAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const user = await getUserByToken(token);
  const isRightsEnough = (user && user.roles.includes(userRoles.admin));
  if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights');
  next();
};

module.exports = { validate, usePassport, checkIsAdmin };