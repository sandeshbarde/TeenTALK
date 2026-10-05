# TeenTalk - Role-Based Access Control (RBAC) Matrix

This matrix documents permissions across all 10 roles and all API/UI endpoints in the TeenTalk ecosystem.

---

## 1. Roles Definition

1. **Teen (`teen`)**: Adolescent student accessing safety learning, quizzes, certificates, safe AI chat, and mood tracking.
2. **Adult / Parent (`adult`)**: Parent or legal guardian reviewing guidance resources, communication advice, and teen safety modules.
3. **Employee (`employee`)**: Workplace intern or employee accessing POSH resources, filing confidential complaints, and tracking cases.
4. **School Admin (`school_admin`)**: Principal or designated school coordinator managing student safety curriculum and monitoring completion rates.
5. **HR / POSH Committee (`hr`)**: Internal Committee (IC) lead investigating harassment reports, scheduling hearings, and issuing findings.
6. **NGO (`ngo`)**: Child welfare NGO advocate providing community support, shelter referrals, and victim assistance.
7. **Counselor (`counselor`)**: Licensed psychologist or school counselor recording privileged clinical case notes and scheduling sessions.
8. **Content Manager (`content_manager`)**: Educational designer publishing safety modules, quizzes, and multimedia guidance.
9. **Super Admin (`super_admin`)**: Universal system administrator managing tenant organizations, users, and global parameters.
10. **Auditor (`auditor`)**: Regulatory compliance inspector with read-only access to audit logs and institutional reports.

---

## 2. Resource & Endpoint Permission Matrix

| Endpoint / Action | Teen | Adult | Employee | School Admin | HR | NGO | Counselor | Content Mgr | Super Admin | Auditor |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Auth: Register / Login** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Auth: View / Edit Profile** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Teen: Read Safety Modules** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Teen: Update Module Progress** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **School: View Student Roster** | ❌ | ❌ | ❌ | ✅ (Own Org) | ❌ | ❌ | ❌ | ❌ | ✅ (All) | ❌ |
| **School: View Analytics** | ❌ | ❌ | ❌ | ✅ (Own Org) | ❌ | ❌ | ❌ | ❌ | ✅ (All) | ❌ |
| **School: Create / Edit Modules** | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **Complaints: File Incident** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Complaints: Upload Evidence** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Complaints: View My Reports** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Complaints: Track by Code** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Complaints: Download Evidence**| ✅ (Owner)| ❌ | ✅ (Owner)| ❌ | ✅ (Own Org) | ✅ (Assigned) | ✅ (Assigned) | ❌ | ✅ (All) | ✅ (Audit)|
| **HR: View Case Registry** | ❌ | ❌ | ❌ | ❌ | ✅ (Own Org) | ❌ | ❌ | ❌ | ✅ (All) | ❌ |
| **HR: Update Case Status & Findings**| ❌ | ❌ | ❌ | ❌ | ✅ (Own Org) | ❌ | ❌ | ❌ | ✅ (All) | ❌ |
| **Counselor: View Referral Cases**| ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (Own Org) | ✅ (Own Org) | ❌ | ✅ (All) | ❌ |
| **Counselor: Append Case Notes** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **Counselor: View Calendar** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ |
| **AI: Interactive Safe Chat** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Mental Health: Log Daily Mood** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Mental Health: View Mood Trends**| ✅ (Self)| ✅ (Self)| ✅ (Self)| ❌ | ❌ | ❌ | ❌ | ❌ | ✅ (Self)| ❌ |
| **Quiz: Take & Submit Quizzes** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Certificate: Generate & Claim** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Certificate: Verify Publicly** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Admin: Manage Users Directory** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Admin: Manage Organizations** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Admin: Inspect Security Audit Log**| ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ (Read) |

---

## 3. Enforcement Layers

1. **Client-Side Guarding (`RoleGuard.jsx` & `routes.jsx`)**: Renders only authorized views and redirects unauthorized roles gracefully.
2. **Backend Gateway Middleware (`rbac.js`)**: Validates decoded JWT `role` claims against route declarations (`requireRoles(...)`). Rejects violations with HTTP 403.
3. **Multi-Tenant Scoping Middleware (`orgScope.js`)**: Restricts non-superadmin actors to records matching their `org_id`.
4. **Database Row Level Security (RLS)**: Enforces table policies at the PostgreSQL engine level utilizing `auth.uid()` and session contexts.
