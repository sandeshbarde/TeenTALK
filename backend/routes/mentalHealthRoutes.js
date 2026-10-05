const express = require('express');
const router = express.Router();
const mentalHealthController = require('../controllers/mentalHealthController');
const { requireAuth } = require('../middleware/auth');

router.post('/mood-log', requireAuth, mentalHealthController.logMood);
router.get('/mood-history', requireAuth, mentalHealthController.getMoodHistory);

module.exports = router;
