-- ============================================================================
-- TEENTALK PLATFORM DATABASE SCHEMA (PostgreSQL / Supabase)
-- Module Lead: TEJAS (Database & Infrastructure)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ORGANIZATIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('school', 'corporate', 'ngo', 'system')),
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_code ON organizations(code);

-- ----------------------------------------------------------------------------
-- 2. USERS PROFILE TABLE (Linked to auth.users if Supabase Auth is active)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE, -- References auth.users(id) in Supabase
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Fallback for non-Supabase auth / seed testing
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (
        role IN (
            'teen',
            'adult',
            'employee',
            'school_admin',
            'hr',
            'ngo',
            'counselor',
            'content_manager',
            'super_admin',
            'auditor'
        )
    ),
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    avatar_url TEXT,
    phone VARCHAR(50),
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_org_id ON users(org_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ----------------------------------------------------------------------------
-- 3. TEEN MODULES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teen_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (
        category IN (
            'cyber_safety',
            'emotional_wellbeing',
            'safe_touch_boundaries',
            'anti_bullying',
            'digital_footprint',
            'posh_awareness'
        )
    ),
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    reading_time_mins INTEGER NOT NULL DEFAULT 5 CHECK (reading_time_mins > 0),
    order_index INTEGER NOT NULL DEFAULT 1,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teen_modules_category ON teen_modules(category);
CREATE INDEX IF NOT EXISTS idx_teen_modules_order ON teen_modules(order_index);

-- ----------------------------------------------------------------------------
-- 4. PROGRESS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES teen_modules(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completed_at TIMESTAMPTZ,
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_module_progress UNIQUE (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module ON progress(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_status ON progress(status);

-- ----------------------------------------------------------------------------
-- 5. COMPLAINTS TABLE (Confidential POSH & Safety Reporting)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_code VARCHAR(32) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL if anonymous
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (
        category IN (
            'posh_harassment',
            'cyberbullying',
            'school_bullying',
            'stalking',
            'discrimination',
            'mental_distress',
            'other'
        )
    ),
    description TEXT NOT NULL,
    incident_date DATE NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    severity VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(30) NOT NULL DEFAULT 'submitted' CHECK (
        status IN (
            'submitted',
            'under_review',
            'investigation_in_progress',
            'hearing_scheduled',
            'resolved',
            'closed',
            'escalated_to_ngo'
        )
    ),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    consent_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
    resolution_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_complaints_tracking ON complaints(tracking_code);
CREATE INDEX IF NOT EXISTS idx_complaints_org ON complaints(org_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_assigned ON complaints(assigned_to);

-- ----------------------------------------------------------------------------
-- 6. EVIDENCE TABLE (Private Encrypted Documents)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(100) NOT NULL CHECK (
        file_type IN ('application/pdf', 'image/png', 'image/jpeg', 'image/webp')
    ),
    file_size INTEGER NOT NULL CHECK (file_size > 0 AND file_size <= 10485760), -- Max 10MB
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evidence_complaint ON evidence(complaint_id);

-- ----------------------------------------------------------------------------
-- 7. CASE NOTES TABLE (HR, NGO & Counselor Notes)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    note_text TEXT NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_notes_complaint ON case_notes(complaint_id);
CREATE INDEX IF NOT EXISTS idx_case_notes_author ON case_notes(author_id);

-- ----------------------------------------------------------------------------
-- 8. QUIZZES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES teen_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    passing_score INTEGER NOT NULL DEFAULT 70 CHECK (passing_score >= 0 AND passing_score <= 100),
    time_limit_mins INTEGER NOT NULL DEFAULT 15 CHECK (time_limit_mins > 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_module ON quizzes(module_id);

-- ----------------------------------------------------------------------------
-- 9. QUIZ QUESTIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of option objects [{ id: "A", text: "..." }]
    correct_answer VARCHAR(10) NOT NULL,
    explanation TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);

-- ----------------------------------------------------------------------------
-- 10. QUIZ RESULTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    submitted_answers JSONB NOT NULL, -- Map of { question_id: selected_answer }
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz ON quiz_results(quiz_id);

-- ----------------------------------------------------------------------------
-- 11. MOOD LOGS TABLE (Mental Health & Wellbeing)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mood_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 5), -- 1: Terrible, 5: Great
    emotions JSONB NOT NULL DEFAULT '[]'::JSONB, -- Array of strings e.g. ["Anxious", "Hopeful"]
    note TEXT,
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mood_logs_user ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_logged ON mood_logs(logged_at);

-- ----------------------------------------------------------------------------
-- 12. CERTIFICATES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_code VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES teen_modules(id) ON DELETE CASCADE,
    issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    verification_hash VARCHAR(64) NOT NULL,
    CONSTRAINT uq_user_module_certificate UNIQUE (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);

-- ----------------------------------------------------------------------------
-- 13. AUDIT LOGS TABLE (Compliance & Security Audit Trail)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    ip_address VARCHAR(45),
    details JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);
