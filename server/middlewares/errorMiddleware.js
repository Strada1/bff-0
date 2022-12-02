import ApiError from '../exceptions/apiError.js';

export default function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).send({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).send({ message: err.message });
}