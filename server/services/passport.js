import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

import User from '../models/User.js';
import ApiError from '../exceptions/apiError.js';

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
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

export function authenticate() {
  return passport.authenticate('bearer', { session: false })
}