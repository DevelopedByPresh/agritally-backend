import { BaseException } from './lib/base-exception.js';

export class ValidationException extends BaseException {
  /**
   * @param {string} message
   * @param {{ [key: string]: * }} [errors]
   */
  constructor(message, errors) {
    super(400, message, errors);
  }
}
