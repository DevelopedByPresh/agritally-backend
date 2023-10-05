export class BaseHttpResponse {
  /**
   *
   * @param {string} message
   * @param {*} data
   * @param {*} errors
   */
  constructor(message, data, errors) {
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  /**
   *
   * @param {string} message
   * @param {*} data
   * @returns {BaseHttpResponse}
   */
  static success(message, data) {
    return new BaseHttpResponse(message, data, undefined);
  }

  /**
   *
   * @param {string} message
   * @param {*} errors
   * @returns {BaseHttpResponse}
   */
  static failed(message, errors) {
    return new BaseHttpResponse(message, undefined, errors);
  }
}
