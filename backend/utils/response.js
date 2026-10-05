/**
 * Uniform API Response Utility
 */
const successResponse = (res, data = null, message = 'Operation successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, message = 'Internal server error', statusCode = 500, errorCode = 'SERVER_ERROR', details = null) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: errorCode,
      details,
    },
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
