const { findUserByToken } = require('../services/userServices');

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send('You need to Authenticate');
    }

    const user = await findUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(401).send('Authentication failed');
    }

    req.verifiedUser = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .send('Internal server error\nerror: ' + error.message);
  }
};

const checkRole = (role) => (req, res, next) => {
  try {
    const user = req.verifiedUser;
    if (!user) {
      return res.status(401).send('Authentication failed');
    }
    if (!user.roles.includes(role)) {
      return res
        .status(401)
        .send('You are not authorized to perform this action');
    }
    next();
  } catch (error) {
    return res;
  }
};

module.exports = {
  checkAuth,
  checkRole,
};
