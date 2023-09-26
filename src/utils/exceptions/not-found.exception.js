const BaseException = require('./base-exception');

class NotFoundException extends BaseException {
  constructor(message, errors) {
    super(404, message, errors);
  }
}

module.exports = { NotFoundException };
