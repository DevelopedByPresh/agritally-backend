const { ValidationException } = require('../../utils/exceptions/validation.exception.js');
const { messages } = require('../../utils/messages.utils.js');
const { refineError } = require('../../utils/refine-validation-error.utils.js');

class ValidateRequest {
  /**
   *
   * @param {import('joi').ObjectSchema} schema
   */
  constructor(validator) {
    this.execute = this.execute.bind(this);
    this.validator = validator;
  }

  execute(req, res, next) {
    const { value, error } = this.validator.validate(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false, stripUnknown: true },
    );

    if (error) {
      const errors = refineError(error);
      throw new ValidationException(messages.EXCEPTIONS.VALIDATION, errors);
    }

    req.body = value.body || req.body;
    req.params = value.params || req.params;
    req.query = value.query || req.query;

    next();
  }

  /**
   *
   * @param {import('joi').ObjectSchema} schema
   * @returns {(req, res, next) => void}
   */
  static with(schema) {
    return new ValidateRequest(schema).execute;
  }
}

module.exports = { ValidateRequest };
