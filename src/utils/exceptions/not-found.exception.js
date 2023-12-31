import { BaseException } from './lib/base-exception.js';

export class NotFoundException extends BaseException {
  /**
   * @param {string} message
   * @param {{ [key: string]: * }} [errors]
   */
  constructor(message, errors) {
    super(404, message, errors);
  }
}
