const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const teenRoutes = require('./teenRoutes');
const schoolRoutes = require('./schoolRoutes');
const adminRoutes = require('./adminRoutes');
const complaintRoutes = require('./complaintRoutes');
const hrRoutes = require('./hrRoutes');
const counselorRoutes = require('./counselorRoutes');
const aiRoutes = require('./aiRoutes');
const quizRoutes = require('./quizRoutes');
const mentalHealthRoutes = require('./mentalHealthRoutes');
const certificateRoutes = require('./certificateRoutes');

// Health-check endpoint
router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'TeenTalk Backend REST API',
    version: '1.0.0',
  });
});

// Mount modular sub-routers
router.use('/auth', authRoutes);
router.use('/teen', teenRoutes);
router.use('/school', schoolRoutes);
router.use('/admin', adminRoutes);
router.use('/complaints', complaintRoutes);
router.use('/hr', hrRoutes);
router.use('/counselor', counselorRoutes);
router.use('/ai', aiRoutes);
router.use('/quiz', quizRoutes);
router.use('/mentalhealth', mentalHealthRoutes);
router.use('/certificate', certificateRoutes);

module.exports = router;
