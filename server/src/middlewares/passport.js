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
        return done(null, false);
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
      return next(ApiError.Unauthorized_401());
    }

    if (!roles || roles.length === 0) {
      req.user = user;
      return next();
    }

    const allowedRoles = roles.filter(role => user.roles.includes(role));
    const noAllowedRole = roles.length > 0 && allowedRoles.length === 0;

    if (noAllowedRole) {
      return next(ApiError.Forbidden_403('You are not permitted to perform this action'));
    }

    req.user = user;
    next();
  })(req, res, next);
}
