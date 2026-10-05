const validateProgressUpdate = (req, res, next) => {
  const { module_id, status, score, time_spent_seconds } = req.body;
  const errors = [];

  if (!module_id) {
    errors.push('Module ID is required');
  }

  if (status && !['not_started', 'in_progress', 'completed'].includes(status)) {
    errors.push('Status must be not_started, in_progress, or completed');
  }

  if (score !== undefined && (score < 0 || score > 100)) {
    errors.push('Score must be between 0 and 100');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors,
      },
    });
  }

  next();
};

module.exports = {
  validateProgressUpdate,
};
