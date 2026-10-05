const { errorResponse } = require('../utils/response');

/**
 * Role-Based Access Control (RBAC) Middleware
 * Accepts one or multiple allowed roles.
 */
const requireRoles = (...allowedRoles) => {
  const roles = allowedRoles.flat();
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required before permission check', 401, 'AUTH_REQUIRED');
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Forbidden: Role '${req.user.role}' is not authorized to access this resource`,
        403,
        'FORBIDDEN_ROLE',
        { allowedRoles: roles, currentRole: req.user.role }
      );
    }

    next();
  };
};

module.exports = {
  requireRoles,
};
