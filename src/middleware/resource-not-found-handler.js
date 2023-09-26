const { NotFoundException } = require('../utils/exceptions/index');

function resourceNotFoundHandler(req, res, next) {
  const error = new NotFoundException(`Resource not found - ${req.method} ${req.originalUrl}`);

  next(error);
}

module.exports = { resourceNotFoundHandler };
