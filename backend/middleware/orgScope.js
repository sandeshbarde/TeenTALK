const { errorResponse } = require('../utils/response');

/**
 * Organization Scope Validation Middleware
 * Ensures multi-tenant isolation so users can only access records within their assigned organization,
 * unless they are super_admin or auditor.
 */
const requireOrgScope = (resourceOrgIdField = 'org_id') => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401, 'AUTH_REQUIRED');
    }

    // Global administrators and auditors bypass single-org scope
    if (['super_admin', 'auditor'].includes(req.user.role)) {
      return next();
    }

    const requestedOrgId = req.params[resourceOrgIdField] || req.body[resourceOrgIdField] || req.query[resourceOrgIdField];

    if (requestedOrgId && requestedOrgId !== req.user.org_id) {
      return errorResponse(
        res,
        'Forbidden: Cross-organization data access is strictly prohibited',
        403,
        'ORG_SCOPE_VIOLATION',
        { userOrgId: req.user.org_id, requestedOrgId }
      );
    }

    next();
  };
};

module.exports = {
  requireOrgScope,
};
