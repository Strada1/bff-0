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

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .send('Internal server error\nerror: ' + error.message);
  }
};

module.exports = {
  checkAuth,
};
