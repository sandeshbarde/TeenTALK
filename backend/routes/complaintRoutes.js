const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { validateComplaint } = require('../validators/complaintValidator');
const { uploadEvidence } = require('../middleware/upload');

// Anonymous or authenticated filing
router.post('/file', optionalAuth, validateComplaint, complaintController.fileComplaint);

// Upload evidence with file validation
router.post(
  '/upload-evidence',
  optionalAuth,
  uploadEvidence.single('evidence'),
  complaintController.uploadEvidence
);

// Complainant's history (requires auth)
router.get('/my', requireAuth, complaintController.getMyComplaints);

// Confidential lookup (anonymous tracking code or case ID)
router.get('/:id', optionalAuth, complaintController.getComplaintById);

// Authorized download of evidence file
router.get('/:id/evidence/:evidenceId/download', requireAuth, complaintController.downloadEvidence);

module.exports = router;
