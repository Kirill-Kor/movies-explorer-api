const { CONFLICT_CODE } = require('../utils/errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.code = CONFLICT_CODE;
  }
}

module.exports = ConflictError;
