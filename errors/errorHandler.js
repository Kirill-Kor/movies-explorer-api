/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const {
  INCORRECT_DATA_ERROR_CODE,
  INCORRECT_ID_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,

} = require('../utils/errors');
const AuthError = require('./AuthError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? DEFAULT_ERROR_MESSAGE : error.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
