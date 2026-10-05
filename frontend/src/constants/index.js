export const ROLES = {
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

export const ALL_ROLES = Object.values(ROLES);

export const ROLE_LABELS = {
  [ROLES.TEEN]: 'Teen Learner',
  [ROLES.ADULT]: 'Parent / Guardian',
  [ROLES.EMPLOYEE]: 'Employee',
  [ROLES.SCHOOL_ADMIN]: 'School Administrator',
  [ROLES.HR]: 'HR / POSH IC',
  [ROLES.NGO]: 'Child Welfare NGO',
  [ROLES.COUNSELOR]: 'Licensed Counselor',
  [ROLES.CONTENT_MANAGER]: 'Content Manager',
  [ROLES.SUPER_ADMIN]: 'System Super Admin',
  [ROLES.AUDITOR]: 'Compliance Auditor',
};

export const ROLE_DASHBOARD_ROUTES = {
  [ROLES.TEEN]: '/dashboard/teen',
  [ROLES.ADULT]: '/dashboard/adult',
  [ROLES.EMPLOYEE]: '/dashboard/employee',
  [ROLES.SCHOOL_ADMIN]: '/dashboard/school',
  [ROLES.HR]: '/dashboard/hr',
  [ROLES.NGO]: '/dashboard/support',
  [ROLES.COUNSELOR]: '/dashboard/counselor',
  [ROLES.CONTENT_MANAGER]: '/dashboard/admin',
  [ROLES.SUPER_ADMIN]: '/dashboard/admin',
  [ROLES.AUDITOR]: '/dashboard/admin',
};

export const COMPLAINT_CATEGORIES = [
  { value: 'posh_harassment', label: 'POSH Workplace Harassment' },
  { value: 'cyberbullying', label: 'Cyberbullying & Online Harassment' },
  { value: 'school_bullying', label: 'School / Peer Bullying' },
  { value: 'stalking', label: 'Stalking & Boundary Violations' },
  { value: 'discrimination', label: 'Discrimination & Unfair Treatment' },
  { value: 'mental_distress', label: 'Mental Distress & Safety Concern' },
  { value: 'other', label: 'Other Incident' },
];

export const CRISIS_NUMBERS = [
  { name: 'National Childline', number: '1098', desc: 'Free 24/7 child protection helpline' },
  { name: 'National Emergency', number: '112', desc: 'Police, ambulance, and disaster response' },
  { name: 'Tele-MANAS Mental Health', number: '14416', desc: 'Toll-free psychological counseling' },
  { name: 'Women Safety & POSH Support', number: '1091 / 181', desc: 'Women helpline & POSH redressal' },
  { name: 'Cyber Crime Reporting', number: '1930', desc: 'National cyber fraud & abuse reporting' },
];
