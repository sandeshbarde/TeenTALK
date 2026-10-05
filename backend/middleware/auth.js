const jwt = require('jsonwebtoken');
const env = require('../config/env');
const store = require('../models/store');
const { errorResponse } = require('../utils/response');

/**
 * Authentication Middleware
 * Validates local JWT (HS256) session token from Authorization header (Bearer <token>)
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token required', 401, 'AUTH_REQUIRED');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return errorResponse(res, 'Invalid or expired authentication token', 401, 'AUTH_INVALID_TOKEN');
      }

      // Reject purpose-scoped tokens (e.g. evidence download) as session tokens
      if (decoded.purpose && decoded.purpose !== 'session') {
        return errorResponse(res, 'Invalid token purpose: Purpose-scoped tokens cannot be used for session authentication', 401, 'AUTH_INVALID_TOKEN');
      }

      const user = store.users.find(u => u.id === decoded.id);
      if (!user) {
        return errorResponse(res, 'User associated with token not found', 401, 'USER_NOT_FOUND');
      }

      if (user.is_blocked) {
        return errorResponse(res, 'Account has been suspended or blocked', 403, 'ACCOUNT_BLOCKED');
      }

      // Revoke old tokens if password was changed before token issuance
      if (user.password_changed_at && decoded.iat) {
        const passwordChangedSec = Math.floor(new Date(user.password_changed_at).getTime() / 1000);
        if (decoded.iat < passwordChangedSec) {
          return errorResponse(res, 'Token has been revoked due to a password change. Please log in again.', 401, 'AUTH_TOKEN_REVOKED');
        }
      }

      req.user = user;
      next();
    });
  } catch (err) {
    return errorResponse(res, 'Authentication failure', 401, 'AUTH_FAILED', err.message);
  }
};

/**
 * Optional Auth Middleware
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (!err && decoded && (!decoded.purpose || decoded.purpose === 'session')) {
      const user = store.users.find(u => u.id === decoded.id && !u.is_blocked);
      if (user) {
        if (user.password_changed_at && decoded.iat) {
          const passwordChangedSec = Math.floor(new Date(user.password_changed_at).getTime() / 1000);
          if (decoded.iat < passwordChangedSec) {
            req.user = null;
            return next();
          }
        }
        req.user = user;
      } else {
        req.user = null;
      }
    } else {
      req.user = null;
    }
    next();
  });
};

module.exports = {
  requireAuth,
  optionalAuth,
};
