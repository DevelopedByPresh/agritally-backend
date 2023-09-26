const { BaseHttpResponse } = require('../utils/base-http-reponse.utils');
const { BaseException } = require('../utils/exceptions/index.js');

function buildErrorHandlingMiddleware({ logger }) {
  return function errorHandlingMiddleware(error, req, res, next) {
    if (error instanceof SyntaxError && 'body' in error) {
      const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, error);
      res.status(400).json(response);
    }

    if (error instanceof BaseException) {
      if (error.statusCode === 500) {
        logger.error(error.message, error.stack);
      }

      const response = BaseHttpResponse.failed(error.message, error.errors);
      console.log(error);
      res.status(error.statusCode).json(response);
    } else {
      logger.error(`Server Error: ${error.message}`, error.stack);

      const response = BaseHttpResponse.failed(error.message, error);
      res.status(500).json(response);
    }

    next();
  };
}

module.exports = { buildErrorHandlingMiddleware };
