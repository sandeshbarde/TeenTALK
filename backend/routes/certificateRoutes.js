const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { requireAuth } = require('../middleware/auth');

router.get('/my', requireAuth, certificateController.getMyCertificates);
router.post('/teen-program', requireAuth, certificateController.generateTeenCertificate);
router.post('/employee-program', requireAuth, certificateController.generateEmployeeCertificate);
router.get('/generate/:courseId', requireAuth, certificateController.generateCertificate);
router.get('/verify/:code', certificateController.verifyCertificate);

module.exports = router;
