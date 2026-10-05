const quizService = require('../services/quizService');
const { successResponse } = require('../utils/response');

const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    return successResponse(res, quizzes, 'Quizzes retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getQuizById = async (req, res, next) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    return successResponse(res, quiz, 'Quiz details retrieved');
  } catch (err) {
    next(err);
  }
};

const evaluateQuiz = async (req, res, next) => {
  try {
    const result = await quizService.evaluateQuiz(req.user, req.body);
    return successResponse(res, result, 'Quiz evaluated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  evaluateQuiz,
};
