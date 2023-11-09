import { BaseHttpResponse, messages } from '../utils/index.js';

/**
 * Middleware to authorize user roles.
 * @param {...string} allowedRoles - Allowed roles for access.
 * @returns {function} Express middleware function.
 */
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    
    if (allowedRoles.includes(req.user.role)) {
      return next(); 
    }

    const response = BaseHttpResponse.failed(messages.EXCEPTIONS.UNAUTHORIZED_ACCESS);
    return res.status(403).json(response);
  };
}
