import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

import User from '../models/User.js';
import ApiError from '../exceptions/apiError.js';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(ApiError.Unauthorized(), false);
      }

      return done(null, user, { scope: 'all' });
    });
  }
));

export const authorization = (role) => (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return next(ApiError.Unauthorized());
      }

      const userNotHaveAllowedRole = !user.roles.includes(role) && !user.roles.includes(ROLES.ADMIN);
      if (userNotHaveAllowedRole) {
        return next(ApiError.Forbidden('You are not permitted to perform this action'));
      }

      next();
    })(req, res, next);
};