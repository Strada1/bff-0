import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiError.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next( ApiError.BadRequest('incorrect data', errors.array()) );
  }
  next();
};

export default handleValidationErrors;
//
// export default function (validationFields) {
//   return [
//     validationFields,
//     handleValidationErrors,
//   ];
// }
