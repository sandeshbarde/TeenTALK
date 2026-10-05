# TeenTalk - Academic Team Task Breakdown & Ownership Matrix

This document defines the individual module ownership, development deliverables, and integration touchpoints across all four team members.

---

## 1. Payal Sharma (Module Lead: Auth, Public Pages & Teen Safety)

### Responsibilities
- User registration, login, JWT token issuance, and password security.
- Public web portal, hero section, platform mission, and emergency helpline directory.
- Teen learner dashboard layout, safety curriculum catalog, and modular reading engine.
- Reading progress tracking and completion state updates.

### Key Deliverables
- `frontend/src/pages/public/LandingPage.jsx`
- `frontend/src/pages/public/AboutPage.jsx`
- `frontend/src/pages/public/EmergencyHelplinePage.jsx`
- `frontend/src/pages/auth/LoginPage.jsx`
- `frontend/src/pages/auth/RegisterPage.jsx`
- `frontend/src/pages/teen/TeenDashboard.jsx`
- `frontend/src/pages/teen/SafetyModulesPage.jsx`
- `frontend/src/pages/teen/ModuleDetailPage.jsx`
- `backend/services/authService.js`
- `backend/services/teenService.js`
- `backend/routes/authRoutes.js`
- `backend/routes/teenRoutes.js`
- Test Verification: `TT-AUTH-01`, `TT-AUTH-02`, `TT-TEEN-01`

---

## 2. Tejas Kulkarni (Module Lead: Database, School & Super Admin)

### Responsibilities
- PostgreSQL schema design with 13 normalized tables, foreign keys, and indexes.
- Supabase Row Level Security (RLS) policies and security barrier definitions.
- School administrator console, student roster analytics, and curriculum allocation.
- Super Admin user directory, multi-tenant organization manager, and security audit log.

### Key Deliverables
- `backend/database/schema.sql`
- `backend/database/rls.sql`
- `backend/database/seeds.sql`
- `frontend/src/pages/school/SchoolDashboard.jsx`
- `frontend/src/pages/school/StudentsListPage.jsx`
- `frontend/src/pages/admin/AdminDashboard.jsx`
- `frontend/src/pages/admin/UsersManagePage.jsx`
- `frontend/src/pages/admin/OrgsManagePage.jsx`
- `frontend/src/pages/admin/AuditLogsPage.jsx`
- `backend/services/schoolService.js`
- `backend/services/adminService.js`
- `backend/routes/schoolRoutes.js`
- `backend/routes/adminRoutes.js`
- Test Verification: `TT-RBAC-01`, `TT-SCHOOL-01`

---

## 3. Nisha Verma (Module Lead: POSH, Complaints, HR & Counselor Hub)

### Responsibilities
- Confidential incident reporting form with anonymous submission toggle.
- Tokenized tracking code generator (`TT-CASE-YYYY-XXXX`) and status tracker.
- Encrypted multi-part evidence uploader (PDF, PNG, JPG, WEBP) with private tokenized streaming.
- HR POSH Internal Committee case registry and status milestone updates.
- Counselor privileged case notes and wellness appointment calendar.

### Key Deliverables
- `frontend/src/pages/employee/EmployeeDashboard.jsx`
- `frontend/src/pages/employee/FileComplaintPage.jsx`
- `frontend/src/pages/employee/TrackComplaintPage.jsx`
- `frontend/src/pages/hr/HRDashboard.jsx`
- `frontend/src/pages/ngo/SupportDashboard.jsx`
- `frontend/src/pages/ngo/CounselorCalendarPage.jsx`
- `backend/services/complaintService.js`
- `backend/services/storageService.js`
- `backend/services/hrService.js`
- `backend/services/counselorService.js`
- `backend/routes/complaintRoutes.js`
- `backend/routes/hrRoutes.js`
- `backend/routes/counselorRoutes.js`
- Test Verification: `TT-COMP-01`, `TT-COMP-02`, `TT-HR-01`

---

## 4. Harshada Patil (Module Lead: Adult Guidance, AI Chat, Mood, Quiz & Certification)

### Responsibilities
- Parent and guardian guidance center for adolescent digital safety and mental health.
- Crisis-aware educational AI companion with self-harm trigger escalation to helplines 1098 & 112.
- Daily emotional wellness tracker with rating check-ins, emotion descriptor tags, and Recharts trend visualizer.
- Interactive safety quiz player with instant pedagogical explanation feedback.
- SHA-256 cryptographic certificate generation and verification engine.

### Key Deliverables
- `frontend/src/pages/adult/AdultDashboard.jsx`
- `frontend/src/pages/teen/AIChatPage.jsx`
- `frontend/src/pages/teen/MoodTrackerPage.jsx`
- `frontend/src/pages/teen/QuizPage.jsx`
- `frontend/src/pages/teen/CertificatePage.jsx`
- `backend/services/aiSafetyService.js`
- `backend/services/mentalHealthService.js`
- `backend/services/quizService.js`
- `backend/services/certificateService.js`
- `backend/routes/aiRoutes.js`
- `backend/routes/mentalHealthRoutes.js`
- `backend/routes/quizRoutes.js`
- `backend/routes/certificateRoutes.js`
- Test Verification: `TT-AI-01`, `TT-QUIZ-01`, `TT-CERT-01`

---

## 5. Integration Contract & Shared Infrastructure

All modules integrate into a unified full-stack architecture through shared layers:
1. **Unified API Gateway**: Express REST router mounted at `/api`.
2. **Unified Data Store**: PostgreSQL database with synchronized schemas and foreign keys.
3. **Common UI Component System**: Shared design tokens, buttons, cards, modals, form inputs, and layout wrappers.
4. **Client-Side Centralized Context**: Shared `AuthContext`, `ToastContext`, and `apiClient` service.
