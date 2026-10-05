const schoolService = require('../services/schoolService');
const { successResponse } = require('../utils/response');

const getStudents = async (req, res, next) => {
  try {
    const students = await schoolService.getSchoolStudents(req.user);
    return successResponse(res, students, 'School students retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await schoolService.getSchoolAnalytics(req.user);
    return successResponse(res, analytics, 'School analytics generated successfully');
  } catch (err) {
    next(err);
  }
};

const getModules = async (req, res, next) => {
  try {
    const modules = await schoolService.getSchoolModules(req.user);
    return successResponse(res, modules, 'School curriculum modules retrieved');
  } catch (err) {
    next(err);
  }
};

const createModule = async (req, res, next) => {
  try {
    const newMod = await schoolService.addSchoolModule(req.user, req.body);
    return successResponse(res, newMod, 'School module added successfully', 201);
  } catch (err) {
    next(err);
  }
};

const updateModule = async (req, res, next) => {
  try {
    const updated = await schoolService.updateSchoolModule(req.user, req.params.id, req.body);
    return successResponse(res, updated, 'School module updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStudents,
  getAnalytics,
  getModules,
  createModule,
  updateModule,
};
