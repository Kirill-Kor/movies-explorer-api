const { NOT_FOUND_STATUS_CODE } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.code = NOT_FOUND_STATUS_CODE;
  }
}

module.exports = NotFoundError;
