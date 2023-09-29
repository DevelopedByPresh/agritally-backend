export class BaseException extends Error {
    constructor(statusCode, message, errors = {}, isOperational = true) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default BaseException;
  