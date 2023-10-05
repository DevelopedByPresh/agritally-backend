export class BaseException extends Error {
  /**
   *
   * @param {number} code
   * @param {string} message
   * @param {{ [key: string]: * }} [errors]
   * @param {boolean} [isOperational]
   */
  constructor(code, message, errors, isOperational = true) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.code = code;
    this.errors = errors;
    this.isOperational = isOperational;

    Error?.captureStackTrace(this, this.constructor);
  }
}
