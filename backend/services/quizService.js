const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const getAllQuizzes = async () => {
  return store.quizzes.filter(q => q.is_active).map(q => {
    const questionCount = store.quiz_questions.filter(qq => qq.quiz_id === q.id).length;
    const mod = store.teen_modules.find(m => m.id === q.module_id);
    return {
      ...q,
      question_count: questionCount,
      module_title: mod ? mod.title : null,
    };
  });
};

const getQuizById = async (quizId) => {
  const quiz = store.quizzes.find(q => (q.id === quizId || q.module_id === quizId) && q.is_active);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    error.code = 'QUIZ_NOT_FOUND';
    throw error;
  }

  // Omit correct_answer from public quiz question payload so users cannot inspect client payload
  const questions = store.quiz_questions
    .filter(qq => qq.quiz_id === quiz.id)
    .sort((a, b) => a.order_index - b.order_index)
    .map(qq => ({
      id: qq.id,
      question_text: qq.question_text,
      options: qq.options,
      order_index: qq.order_index,
    }));

  const mod = store.teen_modules.find(m => m.id === quiz.module_id);

  return {
    ...quiz,
    module: mod || null,
    questions,
  };
};

const evaluateQuiz = async (user, { quiz_id, answers }) => {
  const quiz = store.quizzes.find(q => q.id === quiz_id || q.module_id === quiz_id);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    error.code = 'QUIZ_NOT_FOUND';
    throw error;
  }

  const questions = store.quiz_questions.filter(qq => qq.quiz_id === quiz.id);
  if (questions.length === 0) {
    const error = new Error('No questions configured for this quiz');
    error.statusCode = 400;
    error.code = 'EMPTY_QUIZ';
    throw error;
  }

  let correctCount = 0;
  const detailedBreakdown = [];

  for (const q of questions) {
    const selectedOption = answers[q.id];
    const isCorrect = selectedOption === q.correct_answer;
    if (isCorrect) correctCount++;

    detailedBreakdown.push({
      question_id: q.id,
      question_text: q.question_text,
      selected_answer: selectedOption || null,
      correct_answer: q.correct_answer,
      is_correct: isCorrect,
      explanation: q.explanation,
    });
  }

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= quiz.passing_score;
  const wrongCount = questions.length - correctCount;

  const resultRecord = {
    id: uuidv4(),
    user_id: user.id,
    quiz_id: quiz.id,
    score,
    passed,
    correct_count: correctCount,
    total_questions: questions.length,
    submitted_answers: answers,
    attempted_at: new Date().toISOString(),
  };

  store.quiz_results.push(resultRecord);
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  // If passed and module exists, mark module progress complete
  if (quiz.module_id) {
    const progress = store.progress.find(p => p.user_id === user.id && p.module_id === quiz.module_id);
    if (progress) {
      if (passed) {
        progress.status = 'completed';
        progress.score = Math.max(progress.score, score);
        progress.completed_at = new Date().toISOString();
      }
    } else {
      store.progress.push({
        id: uuidv4(),
        user_id: user.id,
        module_id: quiz.module_id,
        status: passed ? 'completed' : 'in_progress',
        score,
        time_spent_seconds: 300,
        completed_at: passed ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }

  await logAuditEvent({
    actorId: user.id,
    action: 'QUIZ_EVALUATED',
    resourceType: 'quiz_results',
    resourceId: resultRecord.id,
    details: { quiz_id: quiz.id, score, passed },
  });

  return {
    score,
    percentage: score,
    passed,
    status: passed ? 'Passed' : 'Failed',
    passing_score: quiz.passing_score,
    total_questions: questions.length,
    correct_count: correctCount,
    correct_answers: correctCount,
    wrong_answers: wrongCount,
    breakdown: detailedBreakdown,
    attempted_at: resultRecord.attempted_at,
  };
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  evaluateQuiz,
};
