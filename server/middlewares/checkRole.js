import ApiError from '../exceptions/apiError.js';
import { ROLES } from '../services/user.js';

const checkRole = (role) => (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(ApiError.Unauthorized());
    }

    const isNotAuthorizedUser = !user.roles.includes(role) && !user.roles.includes(ROLES.ADMIN);

    if (isNotAuthorizedUser) {
      return next(ApiError.Forbidden());
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkRole;