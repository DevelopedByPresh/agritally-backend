import { BaseException } from './lib/base-exception.js';

export class ServerException extends BaseException {
  /**
   * @param {string} message
   * @param {{ [key: string]: * }} [errors]
   */
  constructor(message, errors, stack) {
    super(500, message, errors);

    // Set the custom stack trace
    if (stack) {
      this.stack = stack;
    }
  }
}
