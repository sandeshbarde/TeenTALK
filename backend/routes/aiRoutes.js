const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { optionalAuth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.post('/chat', aiLimiter, optionalAuth, aiController.chat);

module.exports = router;
