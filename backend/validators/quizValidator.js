const validateQuizSubmission = (req, res, next) => {
  const { quiz_id, answers } = req.body;
  const errors = [];

  if (!quiz_id) {
    errors.push('Quiz ID is required');
  }

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    errors.push('Answers object mapping questionId to selectedOption is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Quiz submission validation failed',
        code: 'VALIDATION_ERROR',
        details: errors,
      },
    });
  }

  next();
};

module.exports = {
  validateQuizSubmission,
};
