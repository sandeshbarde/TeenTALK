// ============================================================================
// TEENTALK CONSTANTS & CONFIGURATION
// ============================================================================

const ROLES = {
  TEEN: 'teen',
  ADULT: 'adult',
  EMPLOYEE: 'employee',
  SCHOOL_ADMIN: 'school_admin',
  HR: 'hr',
  NGO: 'ngo',
  COUNSELOR: 'counselor',
  CONTENT_MANAGER: 'content_manager',
  SUPER_ADMIN: 'super_admin',
  AUDITOR: 'auditor',
};

const ALL_ROLES = Object.values(ROLES);

const COMPLAINT_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  INVESTIGATION_IN_PROGRESS: 'investigation_in_progress',
  HEARING_SCHEDULED: 'hearing_scheduled',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  ESCALATED_TO_NGO: 'escalated_to_ngo',
};

const COMPLAINT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

const CRISIS_HOTLINES = [
  { name: 'National Child Helpline (India)', number: '1098', tollFree: true, hours: '24/7' },
  { name: 'National Emergency Number', number: '112', tollFree: true, hours: '24/7' },
  { name: 'Women Helpline / POSH Support', number: '1091 / 181', tollFree: true, hours: '24/7' },
  { name: 'Tele-MANAS Mental Health Support', number: '14416', tollFree: true, hours: '24/7' },
  { name: 'Cyber Crime Helpline', number: '1930', tollFree: true, hours: '24/7' },
];

module.exports = {
  ROLES,
  ALL_ROLES,
  COMPLAINT_STATUS,
  COMPLAINT_SEVERITY,
  CRISIS_HOTLINES,
};
