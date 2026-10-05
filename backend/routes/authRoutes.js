const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
} = require('../validators/authValidator');
const { requireAuth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, validateRegister, authController.register);
router.post('/login', authLimiter, validateLogin, authController.login);
router.post('/forgot-password', authLimiter, validateForgotPassword, authController.forgotPassword);
router.post('/reset-password', authLimiter, validateResetPassword, authController.resetPassword);
router.post('/change-password', requireAuth, validateChangePassword, authController.changePassword);
router.get('/me', requireAuth, authController.getMe);
router.patch('/profile', requireAuth, authController.updateProfile);
router.delete('/me', requireAuth, authController.deleteAccount);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
