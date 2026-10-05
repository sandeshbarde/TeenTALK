const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const env = require('../config/env');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

// Precomputed dummy bcrypt hash for equal login timing on unknown emails
const DUMMY_BCRYPT_HASH = bcrypt.hashSync('DummyPassword123!', 10);

const sanitizeUser = (user) => {
  const { password_hash, reset_token_hash, reset_token_expires, ...safeUser } = user;
  return safeUser;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      org_id: user.org_id,
      purpose: 'session',
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
};

const register = async ({ email, password, full_name, role = 'teen' }) => {
  // Enforce allowed roles for self-registration
  const allowedRoles = ['teen', 'adult', 'employee'];
  const assignedRole = allowedRoles.includes(role) ? role : 'teen';

  // Ignore client-sent org_id for self-registration
  const defaultOrgId = assignedRole === 'teen' ? '22222222-2222-2222-2222-222222222222' : null;

  // Check if user already exists
  const existingUser = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 409;
    error.code = 'USER_ALREADY_EXISTS';
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const newUser = {
    id: uuidv4(),
    auth_id: uuidv4(),
    email: email.toLowerCase(),
    password_hash,
    full_name,
    role: assignedRole,
    org_id: defaultOrgId,
    is_blocked: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.users.push(newUser);
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: newUser.id,
    action: 'USER_REGISTERED',
    resourceType: 'user',
    resourceId: newUser.id,
    details: { email: newUser.email, role: newUser.role },
  });

  const token = generateToken(newUser);
  return { user: sanitizeUser(newUser), token };
};

const login = async ({ email, password }) => {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = store.users.find(u => u.email.toLowerCase() === normalizedEmail);

  // Constant-time execution protection: always execute bcrypt.compare
  if (!user) {
    await bcrypt.compare(password || '', DUMMY_BCRYPT_HASH);
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  if (user.is_blocked) {
    const error = new Error('This account has been deactivated. Please contact support.');
    error.statusCode = 403;
    error.code = 'ACCOUNT_BLOCKED';
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  user.last_login_at = new Date().toISOString();
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'USER_LOGIN',
    resourceType: 'user',
    resourceId: user.id,
    details: { email: user.email, role: user.role },
  });

  const token = generateToken(user);
  return { user: sanitizeUser(user), token };
};

const forgotPassword = async ({ email }) => {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = store.users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

    user.reset_token_hash = tokenHash;
    user.reset_token_expires = expiresAt;
    if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

    // In development/test, log the reset URL for verification
    if (env.NODE_ENV !== 'production') {
      const resetUrl = `http://localhost:5173/reset-password?token=${rawToken}`;
      console.log(`[AUTH] Password reset link for ${user.email}: ${resetUrl}`);
    }

    await logAuditEvent({
      actorId: user.id,
      action: 'PASSWORD_RESET_REQUESTED',
      resourceType: 'user',
      resourceId: user.id,
    });
  }

  // Same response whether or not the email exists to prevent user enumeration
  return {
    message: 'If this email address is registered, password reset instructions have been sent.',
  };
};

const resetPassword = async ({ token, new_password }) => {
  if (!token) {
    const error = new Error('Reset token is required');
    error.statusCode = 400;
    error.code = 'INVALID_RESET_TOKEN';
    throw error;
  }

  const tokenHash = crypto.createHash('sha256').update(token.trim()).digest('hex');
  const now = Date.now();

  const user = store.users.find(
    u => u.reset_token_hash === tokenHash && u.reset_token_expires && u.reset_token_expires > now
  );

  if (!user) {
    const error = new Error('Password reset token is invalid or has expired');
    error.statusCode = 400;
    error.code = 'EXPIRED_OR_INVALID_TOKEN';
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  user.password_hash = await bcrypt.hash(new_password, salt);
  user.password_changed_at = new Date().toISOString();
  delete user.reset_token_hash;
  delete user.reset_token_expires;

  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'PASSWORD_RESET_COMPLETED',
    resourceType: 'user',
    resourceId: user.id,
  });

  return {
    message: 'Password has been reset successfully. Please log in with your new password.',
  };
};

const changePassword = async (userId, { current_password, new_password }) => {
  const user = store.users.find(u => u.id === userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const isMatch = await bcrypt.compare(current_password, user.password_hash);
  if (!isMatch) {
    const error = new Error('Current password is incorrect');
    error.statusCode = 400;
    error.code = 'INVALID_CURRENT_PASSWORD';
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  user.password_hash = await bcrypt.hash(new_password, salt);
  user.password_changed_at = new Date().toISOString();

  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'PASSWORD_CHANGED',
    resourceType: 'user',
    resourceId: user.id,
  });

  return {
    message: 'Password changed successfully. Existing sessions have been revoked.',
  };
};

const getProfile = async (userId) => {
  const user = store.users.find(u => u.id === userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const org = store.organizations.find(o => o.id === user.org_id);
  return {
    ...sanitizeUser(user),
    organization: org || null,
  };
};

const updateProfile = async (userId, updates) => {
  const userIndex = store.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const allowedFields = ['full_name', 'phone', 'avatar_url', 'age_group', 'bio', 'preferences'];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      store.users[userIndex][field] = updates[field];
    }
  }

  store.users[userIndex].updated_at = new Date().toISOString();
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: userId,
    action: 'PROFILE_UPDATED',
    resourceType: 'user',
    resourceId: userId,
  });

  return sanitizeUser(store.users[userIndex]);
};

// Data deletion endpoint for serving minors (compliance)
const deleteAccount = async (userId) => {
  const userIndex = store.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const user = store.users[userIndex];
  // Anonymize user records and delete user
  store.users.splice(userIndex, 1);
  // Clear progress
  store.progress = store.progress.filter(p => p.user_id !== userId);

  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: userId,
    action: 'USER_ACCOUNT_DELETED',
    resourceType: 'user',
    resourceId: userId,
  });

  return { message: 'Your account and personal data have been completely deleted.' };
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
  deleteAccount,
  generateToken,
};
