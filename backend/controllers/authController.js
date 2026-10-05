const authService = require('../services/authService');
const { successResponse } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, result, 'User registration successful', 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, result, 'Login successful', 200);
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body);
    return successResponse(res, result, result.message, 200);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body);
    return successResponse(res, result, result.message, 200);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user.id, req.body);
    return successResponse(res, result, result.message, 200);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getProfile(req.user.id);
    return successResponse(res, profile, 'Profile retrieved successfully', 200);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updated = await authService.updateProfile(req.user.id, req.body);
    return successResponse(res, updated, 'Profile updated successfully', 200);
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const result = await authService.deleteAccount(req.user.id);
    return successResponse(res, result, result.message, 200);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    return successResponse(res, null, 'Logged out successfully', 200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
  deleteAccount,
  logout,
};
