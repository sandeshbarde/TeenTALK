const express = require('express');
const router = express.Router();
const counselorController = require('../controllers/counselorController');
const { requireAuth } = require('../middleware/auth');
const { requireRoles } = require('../middleware/rbac');

// Counselor, NGO & Super Admin routes
router.use(requireAuth, requireRoles('counselor', 'ngo', 'super_admin'));

router.get('/cases', counselorController.getCases);
router.post('/notes', counselorController.addNote);
router.get('/calendar', counselorController.getCalendar);

module.exports = router;
