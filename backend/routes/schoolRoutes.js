const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { requireAuth } = require('../middleware/auth');
const { requireRoles } = require('../middleware/rbac');

// All school routes require school_admin or super_admin
router.use(requireAuth, requireRoles('school_admin', 'super_admin'));

router.get('/students', schoolController.getStudents);
router.get('/analytics', schoolController.getAnalytics);
router.get('/modules', schoolController.getModules);
router.post('/modules', schoolController.createModule);
router.patch('/modules/:id', schoolController.updateModule);

module.exports = router;
