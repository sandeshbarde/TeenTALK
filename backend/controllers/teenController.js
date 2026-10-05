const teenService = require('../services/teenService');
const { successResponse } = require('../utils/response');

const getModules = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const audience = req.query.audience || null;
    const modules = await teenService.getModules(userId, audience);
    return successResponse(res, modules, 'Modules retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getModuleById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const moduleItem = await teenService.getModuleById(req.params.id, userId);
    return successResponse(res, moduleItem, 'Module details retrieved');
  } catch (err) {
    next(err);
  }
};

const getProgress = async (req, res, next) => {
  try {
    const audience = req.query.audience || null;
    const progress = await teenService.getProgress(req.user.id, audience);
    return successResponse(res, progress, 'Progress retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const result = await teenService.updateProgress(req.user.id, req.body);
    return successResponse(res, result, 'Progress updated successfully');
  } catch (err) {
    next(err);
  }
};

const getScenarios = async (req, res, next) => {
  try {
    const list = await teenService.getScenarios(req.query.age_group);
    return successResponse(res, list, 'Scenarios retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getScenarioById = async (req, res, next) => {
  try {
    const scenario = await teenService.getScenarioById(req.params.id);
    return successResponse(res, scenario, 'Scenario details retrieved');
  } catch (err) {
    next(err);
  }
};

const getDocumentation = async (req, res, next) => {
  try {
    const list = await teenService.getDocumentation();
    return successResponse(res, list, 'Documentation resources retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getDocumentationById = async (req, res, next) => {
  try {
    const doc = await teenService.getDocumentationById(req.params.id);
    return successResponse(res, doc, 'Documentation details retrieved');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getModules,
  getModuleById,
  getProgress,
  updateProgress,
  getScenarios,
  getScenarioById,
  getDocumentation,
  getDocumentationById,
};
