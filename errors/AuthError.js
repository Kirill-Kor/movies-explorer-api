const { AUTH_ERROR_CODE } = require('../utils/errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.code = AUTH_ERROR_CODE;
  }
}

module.exports = AuthError;
