const { passport } = require('./passport');

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

module.exports = {
  checkAuth,
};
