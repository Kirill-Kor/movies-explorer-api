const { BAD_REQUEST_CODE } = require('../utils/errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.code = BAD_REQUEST_CODE;
  }
}

module.exports = BadRequestError;
