import { BaseException } from './lib/base-exception.js';

export class UnauthorizedException extends BaseException {
  /**
   * @param {string} message
   * @param {{ [key: string]: * }} [errors]
   */
  constructor(message, errors) {
    super(401, message, errors);
  }
}
