const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const User = require('../models/User');

passport.use(
  new BearerStrategy(function (token, done) {
    User.findOne({ token }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    });
  })
);

module.exports = {passport};