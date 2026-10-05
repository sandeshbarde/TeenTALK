const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const getSchoolStudents = async (schoolAdminUser) => {
  const orgId = schoolAdminUser.org_id;
  // Get all students enrolled in this school org
  const students = store.users
    .filter(u => u.role === 'teen' && (schoolAdminUser.role === 'super_admin' || u.org_id === orgId))
    .map(u => {
      const userProgress = store.progress.filter(p => p.user_id === u.id);
      const completedCount = userProgress.filter(p => p.status === 'completed').length;
      const certCount = store.certificates.filter(c => c.user_id === u.id).length;
      return {
        id: u.id,
        full_name: u.full_name,
        email: u.email,
        created_at: u.created_at,
        completed_modules: completedCount,
        certificates_earned: certCount,
        last_active: userProgress[0]?.updated_at || u.created_at,
      };
    });

  return students;
};

const getSchoolAnalytics = async (schoolAdminUser) => {
  const orgId = schoolAdminUser.org_id;
  const students = store.users.filter(u => u.role === 'teen' && (schoolAdminUser.role === 'super_admin' || u.org_id === orgId));
  const studentIds = students.map(s => s.id);

  const allProgress = store.progress.filter(p => studentIds.includes(p.user_id));
  const totalCompleted = allProgress.filter(p => p.status === 'completed').length;
  const totalInProgress = allProgress.filter(p => p.status === 'in_progress').length;

  const totalCertificates = store.certificates.filter(c => studentIds.includes(c.user_id)).length;
  const complaints = store.complaints.filter(c => schoolAdminUser.role === 'super_admin' || c.org_id === orgId);

  // Module breakdown
  const moduleBreakdown = store.teen_modules.map(m => {
    const completions = allProgress.filter(p => p.module_id === m.id && p.status === 'completed').length;
    return {
      module_id: m.id,
      title: m.title,
      category: m.category,
      completions,
    };
  });

  return {
    total_enrolled_students: students.length,
    total_module_completions: totalCompleted,
    total_active_learners: totalInProgress,
    total_certificates_awarded: totalCertificates,
    reported_incidents_count: complaints.length,
    module_breakdown: moduleBreakdown,
  };
};

const getSchoolModules = async (schoolAdminUser) => {
  return store.teen_modules.map(m => ({
    ...m,
    is_school_curriculum: true,
  }));
};

const addSchoolModule = async (schoolAdminUser, moduleData) => {
  const newModule = {
    id: uuidv4(),
    title: moduleData.title,
    slug: moduleData.slug || moduleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: moduleData.category || 'cyber_safety',
    description: moduleData.description,
    content: moduleData.content,
    reading_time_mins: Number(moduleData.reading_time_mins) || 5,
    order_index: store.teen_modules.length + 1,
    is_published: true,
    author_id: schoolAdminUser.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.teen_modules.push(newModule);

  await logAuditEvent({
    actorId: schoolAdminUser.id,
    action: 'SCHOOL_MODULE_CREATED',
    resourceType: 'teen_modules',
    resourceId: newModule.id,
    details: { title: newModule.title, org_id: schoolAdminUser.org_id },
  });

  return newModule;
};

const updateSchoolModule = async (schoolAdminUser, moduleId, updates) => {
  const modIndex = store.teen_modules.findIndex(m => m.id === moduleId);
  if (modIndex === -1) {
    const error = new Error('Module not found');
    error.statusCode = 404;
    error.code = 'MODULE_NOT_FOUND';
    throw error;
  }

  const allowed = ['title', 'description', 'content', 'category', 'reading_time_mins', 'is_published'];
  for (const key of allowed) {
    if (updates[key] !== undefined) {
      store.teen_modules[modIndex][key] = updates[key];
    }
  }
  store.teen_modules[modIndex].updated_at = new Date().toISOString();

  await logAuditEvent({
    actorId: schoolAdminUser.id,
    action: 'SCHOOL_MODULE_UPDATED',
    resourceType: 'teen_modules',
    resourceId: moduleId,
  });

  return store.teen_modules[modIndex];
};

module.exports = {
  getSchoolStudents,
  getSchoolAnalytics,
  getSchoolModules,
  addSchoolModule,
  updateSchoolModule,
};
