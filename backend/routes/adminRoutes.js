const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const { requireRoles } = require('../middleware/rbac');
const { validateOrgCreate } = require('../validators/adminValidator');

// User & Org management requires super_admin (auditor has read-only access to audit logs)
router.get('/users', requireAuth, requireRoles('super_admin'), adminController.getUsers);
router.patch('/users/:id', requireAuth, requireRoles('super_admin'), adminController.updateUser);
router.delete('/users/:id', requireAuth, requireRoles('super_admin'), adminController.deleteUser);

router.get('/orgs', requireAuth, requireRoles('super_admin', 'auditor'), adminController.getOrgs);
router.post('/orgs', requireAuth, requireRoles('super_admin'), validateOrgCreate, adminController.createOrg);
router.patch('/orgs/:id', requireAuth, requireRoles('super_admin'), adminController.updateOrg);

router.get('/audit-logs', requireAuth, requireRoles('super_admin', 'auditor'), adminController.getAuditLogs);

module.exports = router;
