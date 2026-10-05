const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/response');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 auth requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many login attempts, please try again after 15 minutes', 429, 'RATE_LIMIT_EXCEEDED');
  },
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60, // 60 messages per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'AI Chat message rate limit reached. Please wait a moment before sending more messages.', 429, 'RATE_LIMIT_EXCEEDED');
  },
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return errorResponse(res, 'Too many requests, please slow down', 429, 'RATE_LIMIT_EXCEEDED');
  },
});

module.exports = {
  authLimiter,
  aiLimiter,
  generalLimiter,
};
