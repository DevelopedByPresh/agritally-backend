const { logger } = require('../utils/logger.utils');
const { buildErrorHandlingMiddleware } = require('./error-handling.middleware');
const { resourceNotFoundHandler } = require('./resource-not-found-handler');
const { validateRequestMiddleware } = require('./validate-request.middleware');

module.exports = {
  resourceNotFoundHandler,
  validateRequestMiddleware,
  errorHandlingMiddleware: buildErrorHandlingMiddleware({ logger }),
};
