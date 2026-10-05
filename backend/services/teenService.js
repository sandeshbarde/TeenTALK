const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const getModules = async (userId = null, audience = null) => {
  let publishedModules = store.teen_modules
    .filter(m => m.is_published)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  if (audience) {
    publishedModules = publishedModules.filter(m => m.audience === audience);
  }

  if (!userId) {
    return publishedModules;
  }

  // Enrich with user's progress status
  return publishedModules.map(m => {
    const userProgress = store.progress.find(p => p.user_id === userId && p.module_id === m.id);
    return {
      ...m,
      progress: userProgress || {
        status: 'not_started',
        score: 0,
        time_spent_seconds: 0,
        completed_at: null,
      },
    };
  });
};

const getModuleById = async (moduleId, userId = null) => {
  const mod = store.teen_modules.find(m => m.id === moduleId || m.slug === moduleId);
  if (!mod) {
    const error = new Error('Safety module not found');
    error.statusCode = 404;
    error.code = 'MODULE_NOT_FOUND';
    throw error;
  }

  let progress = null;
  if (userId) {
    progress = store.progress.find(p => p.user_id === userId && p.module_id === mod.id);
  }

  // Find associated quiz if any
  const quiz = store.quizzes.find(q => q.module_id === mod.id && q.is_active);

  return {
    ...mod,
    progress: progress || { status: 'not_started', score: 0, time_spent_seconds: 0 },
    quiz: quiz ? { id: quiz.id, title: quiz.title, passing_score: quiz.passing_score, time_limit_mins: quiz.time_limit_mins } : null,
  };
};

const getProgress = async (userId, audience = null) => {
  const userProgress = store.progress.filter(p => p.user_id === userId);
  let relevantModules = store.teen_modules.filter(m => m.is_published);
  if (audience) {
    relevantModules = relevantModules.filter(m => m.audience === audience);
  }

  const relevantModuleIds = new Set(relevantModules.map(m => m.id));
  const filteredProgress = userProgress.filter(p => relevantModuleIds.has(p.module_id));

  const totalModules = relevantModules.length;
  const completedModules = filteredProgress.filter(p => p.status === 'completed').length;
  const inProgressModules = filteredProgress.filter(p => p.status === 'in_progress').length;

  const enrichedProgress = filteredProgress.map(p => {
    const mod = store.teen_modules.find(m => m.id === p.module_id);
    return {
      ...p,
      module_title: mod ? mod.title : 'Unknown Module',
      module_category: mod ? mod.category : 'general',
      module_number: mod ? mod.module_number : null,
      audience: mod ? mod.audience : null,
    };
  });

  return {
    total_modules: totalModules,
    completed_modules: completedModules,
    in_progress_modules: inProgressModules,
    completion_rate: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
    records: enrichedProgress,
  };
};

const updateProgress = async (userId, { module_id, status = 'in_progress', score = 0, time_spent_seconds = 0 }) => {
  const mod = store.teen_modules.find(m => m.id === module_id || m.slug === module_id);
  if (!mod) {
    const error = new Error('Module not found');
    error.statusCode = 404;
    error.code = 'MODULE_NOT_FOUND';
    throw error;
  }

  let progressRecord = store.progress.find(p => p.user_id === userId && p.module_id === mod.id);

  if (!progressRecord) {
    progressRecord = {
      id: uuidv4(),
      user_id: userId,
      module_id: mod.id,
      status,
      score,
      time_spent_seconds,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.progress.push(progressRecord);
  } else {
    progressRecord.status = status;
    if (score > progressRecord.score) progressRecord.score = score;
    progressRecord.time_spent_seconds += (time_spent_seconds || 0);
    if (status === 'completed' && !progressRecord.completed_at) {
      progressRecord.completed_at = new Date().toISOString();
    }
    progressRecord.updated_at = new Date().toISOString();
  }

  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: userId,
    action: 'MODULE_PROGRESS_UPDATED',
    resourceType: 'progress',
    resourceId: progressRecord.id,
    details: { module_id: mod.id, status, score },
  });

  return progressRecord;
};

const getScenarios = async (ageGroup = null) => {
  if (!ageGroup || ageGroup === 'all') {
    return store.scenarios;
  }
  return store.scenarios.filter(s => s.target_age_group === ageGroup || s.target_age_group === 'all');
};

const getScenarioById = async (id) => {
  const scenario = store.scenarios.find(s => s.id === id);
  if (!scenario) {
    const error = new Error('Scenario not found');
    error.statusCode = 404;
    error.code = 'SCENARIO_NOT_FOUND';
    throw error;
  }
  return scenario;
};

const getDocumentation = async () => {
  return store.employee_documentation || [];
};

const getDocumentationById = async (id) => {
  const doc = (store.employee_documentation || []).find(d => d.id === id || d.related_module_id === id);
  if (!doc) {
    const error = new Error('Documentation resource not found');
    error.statusCode = 404;
    error.code = 'DOC_NOT_FOUND';
    throw error;
  }
  return doc;
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
