# TeenTalk - Database Schema & Data Dictionary

This document details the relational architecture of the TeenTalk platform, built for PostgreSQL and Supabase.

---

## 1. Entity-Relationship Diagram (ERD Concept)

```
[organizations] 1 ----< [users] 1 ----< [progress] >---- 1 [teen_modules]
       |                    |                                     ^
       |                    +---------< [complaints] >----+       |
       |                    |                |            |       |
       +----< [complaints] -+                +--< [evidence]      |
                                             |                    |
                                             +--< [case_notes]    |
                                                                  |
[teen_modules] 1 ----< [quizzes] 1 ----< [quiz_questions]        |
       |                   |                                      |
       |                   +---------< [quiz_results]             |
       |                                                          |
       +----------------< [certificates] >------------------------+
```

---

## 2. Table Specifications

### 1. `organizations`
Stores institutional entities (schools, corporate employers, child welfare NGOs).

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Unique organization identifier |
| `name` | VARCHAR(255) | NOT NULL | Institutional name |
| `type` | VARCHAR(50) | NOT NULL, CHECK ('school', 'corporate', 'ngo', 'system') | Entity category |
| `code` | VARCHAR(50) | UNIQUE, NOT NULL | Alphanumeric referral/enrollment code |
| `address` | TEXT | NULLABLE | Physical location |
| `contact_email` | VARCHAR(255) | NOT NULL | Administrative contact address |
| `contact_phone` | VARCHAR(50) | NULLABLE | Emergency contact line |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active' | Operational status |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Last update timestamp |

### 2. `users`
Central user profiles linked with Supabase Auth or local authentication.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Profile identifier |
| `auth_id` | UUID | UNIQUE, NULLABLE | Supabase Auth UID mapping |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NULLABLE | Bcrypt encrypted secret |
| `full_name` | VARCHAR(255) | NOT NULL | Display name |
| `role` | VARCHAR(50) | NOT NULL, CHECK (1 of 10 roles) | System authorization role |
| `org_id` | UUID | REFERENCES organizations(id) | Associated organization scope |
| `is_blocked` | BOOLEAN | NOT NULL, DEFAULT FALSE | Account suspension flag |
| `last_login_at` | TIMESTAMPTZ | NULLABLE | Timestamp of most recent session |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Registration timestamp |

### 3. `teen_modules`
Curriculum topics for adolescent safety awareness.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Module identifier |
| `title` | VARCHAR(255) | NOT NULL | Module headline |
| `slug` | VARCHAR(255) | UNIQUE, NOT NULL | URL slug identifier |
| `category` | VARCHAR(100) | NOT NULL | Topic classification |
| `description` | TEXT | NOT NULL | Short summary |
| `content` | TEXT | NOT NULL | Markdown educational text |
| `reading_time_mins` | INTEGER | NOT NULL, DEFAULT 5 | Estimated reading duration |
| `order_index` | INTEGER | NOT NULL, DEFAULT 1 | Display sequence order |
| `is_published` | BOOLEAN | NOT NULL, DEFAULT TRUE | Visibility flag |
| `author_id` | UUID | REFERENCES users(id) | Creator/Curriculum lead |

### 4. `progress`
Tracks student module completion and reading state.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Progress record identifier |
| `user_id` | UUID | NOT NULL, REFERENCES users(id) | Student identifier |
| `module_id` | UUID | NOT NULL, REFERENCES teen_modules(id) | Course module |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'not_started' | `not_started`, `in_progress`, `completed` |
| `completed_at` | TIMESTAMPTZ | NULLABLE | Completion date/time |
| `score` | INTEGER | DEFAULT 0, CHECK (0-100) | Module attainment score |
| `time_spent_seconds`| INTEGER | DEFAULT 0 | Accumulated engagement duration |

### 5. `complaints`
Confidential POSH and peer safety incident filings.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Complaint identifier |
| `tracking_code` | VARCHAR(32) | UNIQUE, NOT NULL | Public tracking token |
| `user_id` | UUID | REFERENCES users(id), NULLABLE | Complainant ID (NULL if anonymous) |
| `org_id` | UUID | NOT NULL, REFERENCES organizations(id)| Organization boundary |
| `title` | VARCHAR(255) | NOT NULL | Brief summary |
| `category` | VARCHAR(100) | NOT NULL | Incident category |
| `description` | TEXT | NOT NULL | Detailed statement |
| `incident_date` | DATE | NOT NULL | Date incident occurred |
| `is_anonymous` | BOOLEAN | NOT NULL, DEFAULT FALSE | Anonymous protection flag |
| `severity` | VARCHAR(20) | NOT NULL, DEFAULT 'medium' | `low`, `medium`, `high`, `critical` |
| `status` | VARCHAR(30) | NOT NULL, DEFAULT 'submitted'| Current review milestone |
| `assigned_to` | UUID | REFERENCES users(id), NULLABLE | Assigned case investigator |
| `consent_confirmed` | BOOLEAN | NOT NULL, DEFAULT TRUE | User affirmation flag |
| `resolution_summary`| TEXT | NULLABLE | Official findings & redressal |

### 6. `evidence`
Attachments for incident investigation.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Evidence record identifier |
| `complaint_id` | UUID | NOT NULL, REFERENCES complaints(id) | Target incident |
| `file_name` | VARCHAR(255) | NOT NULL | Sanitized filename |
| `file_path` | TEXT | NOT NULL | Private encrypted disk path |
| `file_type` | VARCHAR(100) | NOT NULL, CHECK (MIME types) | Allowed MIME category |
| `file_size` | INTEGER | NOT NULL, CHECK (0 < size <= 10MB) | File size in bytes |
| `uploaded_by` | UUID | REFERENCES users(id), NULLABLE | Uploader profile |

### 7. `case_notes`
Investigative case notes recorded by HR or counselors.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, gen_random_uuid() | Note identifier |
| `complaint_id` | UUID | NOT NULL, REFERENCES complaints(id) | Incident report |
| `author_id` | UUID | NOT NULL, REFERENCES users(id) | IC / Counselor profile |
| `note_text` | TEXT | NOT NULL | Confidential observation |
| `is_private` | BOOLEAN | NOT NULL, DEFAULT TRUE | Privilege flag |

### 8. `quizzes`, 9. `quiz_questions`, 10. `quiz_results`
Knowledge check questions, answer options (JSONB), and user score history.

### 11. `mood_logs`
Adolescent emotional health tracking with ratings (1-5), emotion arrays, and private reflections.

### 12. `certificates`
Cryptographically signed certificates carrying `certificate_code` and SHA-256 `verification_hash`.

### 13. `audit_logs`
Tamper-evident logs of administrative actions, user logins, and incident status updates.
