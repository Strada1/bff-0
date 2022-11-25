import { validationResult } from 'express-validator';

export default function (validationFields) {
  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  return [
    validationFields,
    handleValidationErrors,
  ];
}
