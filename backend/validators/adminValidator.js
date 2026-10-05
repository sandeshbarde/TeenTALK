const validateOrgCreate = (req, res, next) => {
  const { name, type, contact_email } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Organization name is required');
  }

  if (!type || !['school', 'corporate', 'ngo', 'system'].includes(type)) {
    errors.push('Valid organization type is required (school, corporate, ngo, system)');
  }

  if (!contact_email || !contact_email.includes('@')) {
    errors.push('Valid contact email is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Organization validation failed',
        code: 'VALIDATION_ERROR',
        details: errors,
      },
    });
  }

  next();
};

module.exports = {
  validateOrgCreate,
};
