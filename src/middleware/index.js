const { logger } = require('../utils/logger.utils');
const { errorHandlingMiddleware } = require('./error-handling.middleware');
const { resourceNotFoundHandler } = require('./resource-not-found-handler');
const { validateRequestMiddleware } = require('./validate-request.middleware');

module.exports = {
  resourceNotFoundHandler,
  validateRequestMiddleware,
  errorHandlingMiddleware,
};
