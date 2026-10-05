const mentalHealthService = require('../services/mentalHealthService');
const { successResponse } = require('../utils/response');

const logMood = async (req, res, next) => {
  try {
    const log = await mentalHealthService.logMood(req.user, req.body);
    return successResponse(res, log, 'Mood entry logged successfully', 201);
  } catch (err) {
    next(err);
  }
};

const getMoodHistory = async (req, res, next) => {
  try {
    const history = await mentalHealthService.getMoodHistory(req.user);
    return successResponse(res, history, 'Mood history retrieved');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  logMood,
  getMoodHistory,
};
