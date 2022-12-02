const checkRole = (role) => (req, res, next) => {
  try {
    const user = req.user;
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
  checkRole,
};
