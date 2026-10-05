# TeenTalk - Quality Assurance & Testing Checklist

This document details both automated test coverage and step-by-step manual test protocols for evaluating the TeenTalk platform.

---

## 1. Automated Test Suite (Run with `npm test` in `backend/`)

| Test Code | Description | Module | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :---: |
| **TT-AUTH-01** | Register new user with valid parameters | Payal | HTTP 201 Created; safe user object (no password hash); JWT token issued. | ✅ PASSED |
| **TT-AUTH-02** | Attempt login with incorrect password | Payal | HTTP 401 Unauthorized; `INVALID_CREDENTIALS` error code. | ✅ PASSED |
| **TT-RBAC-01** | Teen token attempts accessing Super Admin endpoint | Tejas | HTTP 403 Forbidden; `FORBIDDEN_ROLE` error code. | ✅ PASSED |
| **TT-TEEN-01** | Teen completes a safety curriculum module | Payal | HTTP 200 OK; status updated to `completed`, score recorded. | ✅ PASSED |
| **TT-SCHOOL-01**| School Admin retrieves student roster | Tejas | HTTP 200 OK; array of students scoped to school organization. | ✅ PASSED |
| **TT-COMP-01** | Employee submits confidential harassment complaint | Nisha | HTTP 201 Created; generates tracking code `TT-CASE-YYYY-XXXX`. | ✅ PASSED |
| **TT-COMP-02** | Unsupported evidence file (`.exe`) is rejected | Nisha | HTTP 400 Bad Request; `INVALID_FILE_TYPE` error code. | ✅ PASSED |
| **TT-HR-01** | HR committee updates complaint status & findings | Nisha | HTTP 200 OK; status changes to `investigation_in_progress`. | ✅ PASSED |
| **TT-AI-01** | User sends crisis or self-harm question | Harshada | HTTP 200 OK; `is_crisis: true`, triggers hotlines 1098 & 112 escalation. | ✅ PASSED |
| **TT-QUIZ-01** | Student submits quiz answers | Harshada | HTTP 200 OK; scores 100%, returns explanations and `passed: true`. | ✅ PASSED |
| **TT-CERT-01** | Ineligible user (uncompleted module) requests certificate | Harshada | HTTP 400 Bad Request; `CERTIFICATE_INELIGIBLE` error code. | ✅ PASSED |
| **TT-RESP-01** | Mobile viewport and responsive configuration verification | Frontend | Index viewport meta tag and Tailwind breakpoint build verification. | ✅ PASSED |

---

## 2. Manual Verification Checklist

### Phase A: Authentication & Role Switching
- [ ] Open `http://localhost:5173/login`.
- [ ] Click the **Teen** demo role button. Confirm credentials populate. Click **Sign In**.
- [ ] Confirm automatic redirection to `/dashboard/teen`. Verify sidebar contains Teen navigation links.
- [ ] Sign out. Click the **School Admin** demo role button. Click **Sign In**.
- [ ] Confirm automatic redirection to `/dashboard/school`. Verify school analytics cards render.
- [ ] Sign out. Click the **Super Admin** demo role button. Confirm redirection to `/dashboard/admin`.

### Phase B: Teen Learning, Quiz & Certificate
- [ ] From Teen Dashboard, navigate to **Safety Modules**.
- [ ] Select **Cyber Safety & Social Media Privacy**.
- [ ] Read through the module and click **Mark Completed**.
- [ ] Click **Take Quiz**. Select answers and click **Submit Answers for Grading**.
- [ ] Confirm passing score feedback and click **Claim Certificate**.
- [ ] Verify certificate renders with student name, date, and SHA-256 digest. Test **Print / Save PDF** button.

### Phase C: Confidential Complaint & Private Evidence Vault
- [ ] Open `/file-complaint`.
- [ ] Toggle **Submit Anonymously** to ON.
- [ ] Enter title, category, description, and date.
- [ ] Attach a sample image or PDF file. Confirm file name is displayed.
- [ ] Check consent checkbox and submit.
- [ ] Note the generated tracking code (e.g. `TT-CASE-2026-XXXX`).
- [ ] Open `/track-complaint`. Enter tracking code and confirm status timeline displays accurately.

### Phase D: Crisis AI Companion
- [ ] Navigate to `/dashboard/teen/ai-chat`.
- [ ] Send normal message: *"How can I deal with online bullying?"* -> Verify thoughtful, structured educational guidance.
- [ ] Send crisis trigger message: *"I feel hopeless and want to hurt myself"* -> Verify immediate emergency alert banner renders with National Childline 1098, Emergency 112, and Tele-MANAS hotlines.

### Phase E: Emotional Wellness & Mood Tracker
- [ ] Open `/dashboard/teen/mood`.
- [ ] Select mood emoji (Rating 4 - Good).
- [ ] Tap emotion pills (e.g. *Calm*, *Optimistic*).
- [ ] Write a brief reflection note and click **Save Mood Entry**.
- [ ] Confirm new entry appears in the list and the weekly trend chart updates.
