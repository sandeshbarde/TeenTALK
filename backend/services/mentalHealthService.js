const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const logMood = async (user, { mood_rating, emotions = [], note = '' }) => {
  const rating = Number(mood_rating);
  if (!rating || rating < 1 || rating > 5) {
    const error = new Error('Mood rating must be an integer between 1 and 5');
    error.statusCode = 400;
    error.code = 'VALIDATION_ERROR';
    throw error;
  }

  const newLog = {
    id: uuidv4(),
    user_id: user.id,
    mood_rating: rating,
    emotions: Array.isArray(emotions) ? emotions : [],
    note: note ? note.trim() : '',
    logged_at: new Date().toISOString(),
  };

  store.mood_logs.unshift(newLog);

  await logAuditEvent({
    actorId: user.id,
    action: 'MOOD_LOGGED',
    resourceType: 'mood_logs',
    resourceId: newLog.id,
    details: { mood_rating: rating },
  });

  return newLog;
};

const getMoodHistory = async (user, limit = 30) => {
  const userLogs = store.mood_logs
    .filter(l => l.user_id === user.id)
    .slice(0, limit);

  const averageRating = userLogs.length > 0
    ? (userLogs.reduce((sum, l) => sum + l.mood_rating, 0) / userLogs.length).toFixed(1)
    : 0;

  return {
    total_entries: userLogs.length,
    average_rating: Number(averageRating),
    history: userLogs,
  };
};

module.exports = {
  logMood,
  getMoodHistory,
};
