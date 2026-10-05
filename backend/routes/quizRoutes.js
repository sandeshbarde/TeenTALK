const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { validateQuizSubmission } = require('../validators/quizValidator');

router.get('/', optionalAuth, quizController.getQuizzes);
router.get('/:id', optionalAuth, quizController.getQuizById);
router.post('/evaluate', requireAuth, validateQuizSubmission, quizController.evaluateQuiz);

module.exports = router;
