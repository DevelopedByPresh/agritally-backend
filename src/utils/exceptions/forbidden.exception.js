import { BaseException } from './lib/base-exception.js';

export class ForbiddenException extends BaseException {
  /**
   *
   * @param {string} message
   * @param {{[key: string]: *}} [errors]
   */
  constructor(message, errors) {
    super(403, message, errors);
  }
}
