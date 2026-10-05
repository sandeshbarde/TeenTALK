const ALLOWED_SELF_REGISTRATION_ROLES = ['teen', 'adult', 'employee'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isStrongPassword = (password) => {
  if (typeof password !== 'string') return false;
  if (password.length < 8 || password.length > 128) return false;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasLetter && hasNumber;
};

const validateRegister = (req, res, next) => {
  const { email, password, full_name, role } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }

  if (!password || !isStrongPassword(password)) {
    errors.push('Password must be 8-128 characters long and contain at least one letter and one number');
  }

  if (!full_name || full_name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  // Strictly limit self-registration roles
  if (role && !ALLOWED_SELF_REGISTRATION_ROLES.includes(role)) {
    errors.push(`Registration role must be one of: ${ALLOWED_SELF_REGISTRATION_ROLES.join(', ')}. Administrative and staff roles must be provisioned by a Super Admin.`);
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

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
  }
  if (!password) {
    errors.push('Password is required');
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

const validateForgotPassword = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid email address is required');
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

const validateResetPassword = (req, res, next) => {
  const { token, new_password } = req.body;
  const errors = [];

  if (!token || typeof token !== 'string' || !token.trim()) {
    errors.push('Reset token is required');
  }

  if (!new_password || !isStrongPassword(new_password)) {
    errors.push('New password must be 8-128 characters long and contain at least one letter and one number');
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

const validateChangePassword = (req, res, next) => {
  const { current_password, new_password } = req.body;
  const errors = [];

  if (!current_password) {
    errors.push('Current password is required');
  }

  if (!new_password || !isStrongPassword(new_password)) {
    errors.push('New password must be 8-128 characters long and contain at least one letter and one number');
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
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
  ALLOWED_SELF_REGISTRATION_ROLES,
};
