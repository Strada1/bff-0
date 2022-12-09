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

export const authorization = (roles) => (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(ApiError.Unauthorized());
    }

    if (!roles || roles.length === 0) {
      return next();
    }

    const allowedRolesList = roles.filter(role => user.roles.includes(role));
    const userNotHaveAllowedRole = roles.length > 0 && allowedRolesList.length === 0;

    if (userNotHaveAllowedRole) {
      return next(ApiError.Forbidden('You are not permitted to perform this action'));
    }

    req.user = user;
    next();
  })(req, res, next);
};
