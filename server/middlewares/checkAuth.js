import User from '../models/User.js';
import ApiError from '../exceptions/apiError.js';

// authorization
// TODO passport
async function checkAuth(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.Unauthorized());
    }

    const token =  authorizationHeader.split(' ')[1];

    if (!token) {
      return next(ApiError.Unauthorized());
    }

    const user = await User.findOne({ token });

    if (!user) {
      return next(ApiError.Unauthorized());
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default checkAuth;
