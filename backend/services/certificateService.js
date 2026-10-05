const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const TEEN_MODULE_IDS = ['teen-mod-01', 'teen-mod-02', 'teen-mod-03', 'teen-mod-04', 'teen-mod-05'];
const EMPLOYEE_MODULE_IDS = ['emp-mod-01', 'emp-mod-02', 'emp-mod-03', 'emp-mod-04', 'emp-mod-05', 'emp-mod-06'];

/**
 * Generate comprehensive Teen Learning & Awareness Program Certificate
 * SERVER ENFORCES: Passing quiz score of at least 70%
 */
const generateTeenCertificate = async (user) => {
  // Check quiz result for teen program
  const teenQuiz = store.quizzes.find(q => q.module_id === 'teen-program' || q.id === 'c0000003-0000-0000-0000-000000000003');
  const quizResult = store.quiz_results
    .filter(r => r.user_id === user.id && (r.quiz_id === 'c0000003-0000-0000-0000-000000000003' || r.quiz_id === teenQuiz?.id))
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

  if (!quizResult || quizResult.score < 70) {
    const error = new Error('Certificate Ineligible: You must pass the Teen Learning Assessment with a minimum score of 70% to receive this certificate.');
    error.statusCode = 400;
    error.code = 'CERTIFICATE_INELIGIBLE';
    error.details = {
      required_score: 70,
      current_score: quizResult ? quizResult.score : 0,
      passed: false,
    };
    throw error;
  }

  // Check if certificate already exists
  let cert = store.certificates.find(c => c.user_id === user.id && c.program_type === 'teen');
  if (cert) {
    return {
      ...cert,
      student_name: user.full_name,
      module_title: cert.certificate_title || 'TeenTalk Teen Learning & Awareness Program',
    };
  }

  const certificate_code = `CERT-TEEN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const hashString = `${user.id}:teen-program:${certificate_code}:${new Date().toISOString()}`;
  const verification_hash = crypto.createHash('sha256').update(hashString).digest('hex');

  cert = {
    id: uuidv4(),
    certificate_code,
    user_id: user.id,
    program_type: 'teen',
    certificate_title: 'TeenTalk Teen Learning & Awareness Program',
    issue_date: new Date().toISOString(),
    score: quizResult.score,
    verification_hash,
  };

  store.certificates.push(cert);
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'TEEN_CERTIFICATE_GENERATED',
    resourceType: 'certificates',
    resourceId: cert.id,
    details: { certificate_code, score: cert.score },
  });

  return {
    ...cert,
    student_name: user.full_name,
    module_title: cert.certificate_title,
  };
};

/**
 * Generate Employee Workplace Safety & POSH Awareness Program Certificate
 * SERVER ENFORCES: Completion of all 6 Employee modules (No quiz required)
 */
const generateEmployeeCertificate = async (user) => {
  const completedEmployeeModules = store.progress.filter(
    p => p.user_id === user.id && EMPLOYEE_MODULE_IDS.includes(p.module_id) && p.status === 'completed'
  );

  if (completedEmployeeModules.length < EMPLOYEE_MODULE_IDS.length) {
    const error = new Error(`Certificate Ineligible: You must complete all 6 Employee Safety & POSH modules. Completed: ${completedEmployeeModules.length}/${EMPLOYEE_MODULE_IDS.length}`);
    error.statusCode = 400;
    error.code = 'CERTIFICATE_INELIGIBLE';
    error.details = {
      completed_count: completedEmployeeModules.length,
      total_required: EMPLOYEE_MODULE_IDS.length,
    };
    throw error;
  }

  // Check if certificate already exists
  let cert = store.certificates.find(c => c.user_id === user.id && c.program_type === 'employee');
  const org = store.organizations.find(o => o.id === user.org_id);
  const orgName = org ? org.name : 'TeenTalk Corporate Partner';

  if (cert) {
    return {
      ...cert,
      employee_name: user.full_name,
      student_name: user.full_name,
      organization_name: orgName,
      module_title: cert.certificate_title || 'TeenTalk Workplace Safety & POSH Awareness Program',
    };
  }

  const certificate_code = `CERT-EMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const hashString = `${user.id}:employee-program:${certificate_code}:${new Date().toISOString()}`;
  const verification_hash = crypto.createHash('sha256').update(hashString).digest('hex');

  cert = {
    id: uuidv4(),
    certificate_code,
    user_id: user.id,
    program_type: 'employee',
    certificate_title: 'TeenTalk Workplace Safety & POSH Awareness Program',
    issue_date: new Date().toISOString(),
    organization_name: orgName,
    verification_hash,
  };

  store.certificates.push(cert);
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'EMPLOYEE_CERTIFICATE_GENERATED',
    resourceType: 'certificates',
    resourceId: cert.id,
    details: { certificate_code, organization_name: orgName },
  });

  return {
    ...cert,
    employee_name: user.full_name,
    student_name: user.full_name,
    organization_name: orgName,
    module_title: cert.certificate_title,
  };
};

/**
 * Universal Certificate Generator
 */
const generateCertificate = async (user, courseId) => {
  if (courseId === 'teen-program') {
    return generateTeenCertificate(user);
  }
  if (courseId === 'employee-program') {
    return generateEmployeeCertificate(user);
  }

  const mod = store.teen_modules.find(m => m.id === courseId || m.slug === courseId);
  if (!mod) {
    const error = new Error('Course module not found');
    error.statusCode = 404;
    error.code = 'MODULE_NOT_FOUND';
    throw error;
  }

  // Check progress and passing score for individual module
  const progress = store.progress.find(p => p.user_id === user.id && p.module_id === mod.id);
  if (!progress || progress.status !== 'completed' || (progress.score !== undefined && progress.score < 70)) {
    const error = new Error('Certificate Ineligible: You must complete the module and achieve a passing score of at least 70% to claim your certificate.');
    error.statusCode = 400;
    error.code = 'CERTIFICATE_INELIGIBLE';
    error.details = {
      current_status: progress ? progress.status : 'not_started',
      current_score: progress ? progress.score : 0,
      required_score: 70,
    };
    throw error;
  }

  // Check if certificate already exists
  let cert = store.certificates.find(c => c.user_id === user.id && c.module_id === mod.id);
  if (cert) {
    return {
      ...cert,
      module_title: mod.title,
      student_name: user.full_name,
    };
  }

  const certificate_code = `CERT-TT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const hashString = `${user.id}:${mod.id}:${certificate_code}:${new Date().toISOString()}`;
  const verification_hash = crypto.createHash('sha256').update(hashString).digest('hex');

  cert = {
    id: uuidv4(),
    certificate_code,
    user_id: user.id,
    module_id: mod.id,
    program_type: mod.audience || 'teen',
    certificate_title: mod.title,
    issue_date: new Date().toISOString(),
    score: progress.score || 100,
    verification_hash,
  };

  store.certificates.push(cert);
  if (typeof store.saveSnapshot === 'function') store.saveSnapshot();

  await logAuditEvent({
    actorId: user.id,
    action: 'CERTIFICATE_GENERATED',
    resourceType: 'certificates',
    resourceId: cert.id,
    details: { certificate_code, module_id: mod.id },
  });

  return {
    ...cert,
    module_title: mod.title,
    student_name: user.full_name,
  };
};

const getUserCertificates = async (userId) => {
  const userCerts = store.certificates.filter(c => c.user_id === userId);
  const user = store.users.find(u => u.id === userId);
  const org = user ? store.organizations.find(o => o.id === user.org_id) : null;

  return userCerts.map(cert => {
    let title = cert.certificate_title;
    if (!title && cert.module_id) {
      const mod = store.teen_modules.find(m => m.id === cert.module_id);
      title = mod ? mod.title : 'Safety Course';
    }
    return {
      ...cert,
      user_name: user ? user.full_name : 'Participant',
      certificate_name: title || (cert.program_type === 'employee' ? 'TeenTalk Workplace Safety & POSH Awareness Program' : 'TeenTalk Teen Learning & Awareness Program'),
      organization_name: cert.organization_name || (org ? org.name : 'TeenTalk Global Network'),
    };
  });
};

const verifyCertificate = async (certificateCode) => {
  const cert = store.certificates.find(c => c.certificate_code === certificateCode);
  if (!cert) {
    const error = new Error('Invalid or unverified certificate code');
    error.statusCode = 404;
    error.code = 'CERTIFICATE_INVALID';
    throw error;
  }

  const user = store.users.find(u => u.id === cert.user_id);
  const mod = store.teen_modules.find(m => m.id === cert.module_id);
  const courseTitle = cert.certificate_title || (mod ? mod.title : (cert.program_type === 'employee' ? 'TeenTalk Workplace Safety & POSH Awareness Program' : 'TeenTalk Teen Learning & Awareness Program'));

  return {
    is_valid: true,
    certificate_code: cert.certificate_code,
    recipient_name: user ? user.full_name : 'Verified Participant',
    course_name: courseTitle,
    program_type: cert.program_type,
    organization_name: cert.organization_name || null,
    issue_date: cert.issue_date,
    score: cert.score || null,
    verification_hash: cert.verification_hash,
  };
};

module.exports = {
  generateCertificate,
  generateTeenCertificate,
  generateEmployeeCertificate,
  getUserCertificates,
  verifyCertificate,
};
