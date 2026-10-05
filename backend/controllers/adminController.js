const adminService = require('../services/adminService');
const { successResponse } = require('../utils/response');

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers(req.query);
    return successResponse(res, users, 'Users retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updated = await adminService.updateUser(req.user.id, req.params.id, req.body);
    return successResponse(res, updated, 'User updated successfully');
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await adminService.deleteUser(req.user.id, req.params.id);
    return successResponse(res, result, 'User deleted successfully');
  } catch (err) {
    next(err);
  }
};

const getOrgs = async (req, res, next) => {
  try {
    const orgs = await adminService.getAllOrgs();
    return successResponse(res, orgs, 'Organizations retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const createOrg = async (req, res, next) => {
  try {
    const newOrg = await adminService.createOrg(req.user.id, req.body);
    return successResponse(res, newOrg, 'Organization created successfully', 201);
  } catch (err) {
    next(err);
  }
};

const updateOrg = async (req, res, next) => {
  try {
    const updated = await adminService.updateOrg(req.user.id, req.params.id, req.body);
    return successResponse(res, updated, 'Organization updated successfully');
  } catch (err) {
    next(err);
  }
};

const getAuditLogs = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const logs = await adminService.getAuditLogs(limit);
    return successResponse(res, logs, 'Audit logs retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  getOrgs,
  createOrg,
  updateOrg,
  getAuditLogs,
};
