import { BaseHttpResponse } from '../utils/base-http-response.utils.js';
import { BaseException } from '../utils/exceptions/index.js';
import { logger } from '../utils/logger.utils.js';

/**
 *
 * @param {(Error|BaseException)} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
export function errorHandlingMiddleware(error, req, res, next) {
  if (error instanceof SyntaxError && 'body' in error) {
    const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, error);
    return res.status(400).json(response);
  }

  // if (error instanceof ServerException) {
  //   logger.error(error.message, error.stack);
  //   const response = BaseHttpResponse.failed(error.message, error.errors);
  //   return res.status(error.code).json(response);
  // }

  if (error instanceof BaseException) {
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.code).json(response);
  }

  if (error instanceof Error) {
    logger.error(error.message, error.stack);
    const response = BaseHttpResponse.failed('Something Went Wrong');
    return res.status(500).json(response);
  }

  return next();
}
