import { NotFoundException } from '../utils/exceptions/index.js';

export function resourceNotFoundHandler(req, res, next) {
  const error = new NotFoundException(`Resource not found - ${req.method} ${req.originalUrl}`);
  next(error);
}
