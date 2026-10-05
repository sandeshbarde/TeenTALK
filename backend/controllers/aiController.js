const aiSafetyService = require('../services/aiSafetyService');
const { successResponse } = require('../utils/response');

const chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const response = await aiSafetyService.processAIChatMessage(req.user || null, message);
    return successResponse(res, response, 'AI response generated');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  chat,
};
