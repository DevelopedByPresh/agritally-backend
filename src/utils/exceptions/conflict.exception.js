import { BaseException } from './lib/base-exception.js';

export class ConflictException extends BaseException {
  /**
   *
   * @param {string} message
   * @param {{[key: string]: *}} [errors]
   */
  constructor(message, errors) {
    super(409, message, errors);
  }
}
