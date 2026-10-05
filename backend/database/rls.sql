-- ============================================================================
-- TEENTALK ROW LEVEL SECURITY (RLS) POLICIES
-- Module Lead: TEJAS (Database & Security)
-- ============================================================================

-- Enable RLS on all primary tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE teen_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Get current user role
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS VARCHAR AS $$
    SELECT role FROM users WHERE auth_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: Get current user org_id
CREATE OR REPLACE FUNCTION get_current_user_org_id()
RETURNS UUID AS $$
    SELECT org_id FROM users WHERE auth_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. USERS POLICIES
CREATE POLICY "Users can read their own profile"
    ON users FOR SELECT
    USING (auth_id = auth.uid() OR get_current_user_role() IN ('super_admin', 'auditor', 'school_admin', 'hr'));

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth_id = auth.uid());

CREATE POLICY "Super admins can manage all users"
    ON users FOR ALL
    USING (get_current_user_role() = 'super_admin');

-- 2. ORGANIZATIONS POLICIES
CREATE POLICY "Users can view their own organization"
    ON organizations FOR SELECT
    USING (id = get_current_user_org_id() OR get_current_user_role() IN ('super_admin', 'auditor'));

CREATE POLICY "Super admins can manage organizations"
    ON organizations FOR ALL
    USING (get_current_user_role() = 'super_admin');

-- 3. TEEN MODULES POLICIES
CREATE POLICY "Published modules are readable by all authenticated users"
    ON teen_modules FOR SELECT
    USING (is_published = TRUE OR get_current_user_role() IN ('content_manager', 'super_admin'));

CREATE POLICY "Content managers and super admins can manage modules"
    ON teen_modules FOR ALL
    USING (get_current_user_role() IN ('content_manager', 'super_admin'));

-- 4. PROGRESS POLICIES
CREATE POLICY "Users can view and update their own progress"
    ON progress FOR ALL
    USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "School admins can view progress for students in their organization"
    ON progress FOR SELECT
    USING (
        get_current_user_role() = 'school_admin' AND
        user_id IN (SELECT id FROM users WHERE org_id = get_current_user_org_id())
    );

-- 5. COMPLAINTS POLICIES (Strict Confidentiality & POSH Protection)
CREATE POLICY "Complainants can view their own non-anonymous complaints"
    ON complaints FOR SELECT
    USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

CREATE POLICY "HR and Counselors can view complaints within their organization"
    ON complaints FOR SELECT
    USING (
        get_current_user_role() IN ('hr', 'counselor', 'ngo') AND
        org_id = get_current_user_org_id()
    );

CREATE POLICY "HR and Counselors can update assigned complaints"
    ON complaints FOR UPDATE
    USING (
        get_current_user_role() IN ('hr', 'counselor', 'super_admin') AND
        org_id = get_current_user_org_id()
    );

-- 6. EVIDENCE POLICIES (Private Storage Protection)
CREATE POLICY "Evidence visible to complaint owner and authorized handlers"
    ON evidence FOR SELECT
    USING (
        complaint_id IN (
            SELECT id FROM complaints
            WHERE user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
            OR (org_id = get_current_user_org_id() AND get_current_user_role() IN ('hr', 'counselor', 'ngo', 'super_admin'))
        )
    );

-- 7. CASE NOTES POLICIES
CREATE POLICY "Case notes visible to authorized case investigators"
    ON case_notes FOR SELECT
    USING (
        get_current_user_role() IN ('hr', 'counselor', 'ngo', 'super_admin') AND
        complaint_id IN (SELECT id FROM complaints WHERE org_id = get_current_user_org_id())
    );

-- 8. QUIZZES AND QUESTIONS POLICIES
CREATE POLICY "Anyone can view active quizzes and questions"
    ON quizzes FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can read quiz questions"
    ON quiz_questions FOR SELECT USING (TRUE);

-- 9. QUIZ RESULTS POLICIES
CREATE POLICY "Users can view and submit their own quiz results"
    ON quiz_results FOR ALL
    USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- 10. MOOD LOGS POLICIES (Strict Personal Privacy)
CREATE POLICY "Users can strictly manage only their own mood logs"
    ON mood_logs FOR ALL
    USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- 11. CERTIFICATES POLICIES
CREATE POLICY "Users can view their own certificates or verify by code"
    ON certificates FOR SELECT
    USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()) OR TRUE);

-- 12. AUDIT LOGS POLICIES
CREATE POLICY "Auditors and Super Admins can inspect audit logs"
    ON audit_logs FOR SELECT
    USING (get_current_user_role() IN ('auditor', 'super_admin'));
