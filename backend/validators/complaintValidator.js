const validateComplaint = (req, res, next) => {
  const { title, category, description, incident_date, consent_confirmed } = req.body;
  const errors = [];

  if (!title || title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  const validCategories = [
    'posh_harassment',
    'cyberbullying',
    'school_bullying',
    'stalking',
    'discrimination',
    'mental_distress',
    'other',
  ];

  if (!category || !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  if (!description || description.trim().length < 20) {
    errors.push('Detailed description must be at least 20 characters');
  }

  if (!incident_date) {
    errors.push('Incident date is required');
  }

  if (consent_confirmed === false || consent_confirmed === 'false') {
    errors.push('Consent confirmation is required to submit a complaint');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Complaint validation failed',
        code: 'VALIDATION_ERROR',
        details: errors,
      },
    });
  }

  next();
};

module.exports = {
  validateComplaint,
};
