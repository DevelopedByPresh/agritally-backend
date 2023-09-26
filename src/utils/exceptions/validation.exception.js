const BaseException = require('./base-exception.js');

class ValidationException extends BaseException {
  constructor(message, errors = {}) {
    super(400, message, errors);
  }
}

module.exports = ValidationException;
