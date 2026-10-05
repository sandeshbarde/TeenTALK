const { errorResponse } = require('../utils/response');

/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);

  // Multer file upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File size exceeds 10MB limit', 400, 'FILE_TOO_LARGE');
    }
    return errorResponse(res, `File upload error: ${err.message}`, 400, 'UPLOAD_ERROR');
  }

  // Custom validation or expected errors
  const statusCode = err.statusCode || (err.status ? err.status : 500);
  const errorCode = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'An unexpected error occurred';
  const details = err.details || null;

  return errorResponse(res, message, statusCode, errorCode, details);
};

module.exports = errorHandler;
