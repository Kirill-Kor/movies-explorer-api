const { FORBIDDEN_ERROR_CODE } = require('../utils/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.code = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ForbiddenError;
