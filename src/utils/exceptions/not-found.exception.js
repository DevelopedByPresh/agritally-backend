class BaseException {
  constructor(statusCode, message, errors) {
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}

class NotFoundException extends BaseException {
  constructor(message, errors) {
    super(404, message, errors);
  }
}

export { NotFoundException };
