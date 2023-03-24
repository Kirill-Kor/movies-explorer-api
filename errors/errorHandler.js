const {
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,

} = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
  const statusCode = error.code || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? DEFAULT_ERROR_MESSAGE : error.message;

  return res.status(statusCode).send({ message });
};

module.exports = errorHandler;
