module.exports.errorHandler = function ({ res, e, status = 400 }) {
  return res.status(status).send(e.message);
};
