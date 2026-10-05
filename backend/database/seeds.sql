-- ============================================================================
-- TEENTALK SEED DATA (Organizations, Users, Modules, Quizzes, Sample Cases)
-- Module Lead: TEJAS (Database) & PAYAL (Safety Content)
-- ============================================================================

-- Clean existing data
TRUNCATE TABLE audit_logs CASCADE;
TRUNCATE TABLE certificates CASCADE;
TRUNCATE TABLE mood_logs CASCADE;
TRUNCATE TABLE quiz_results CASCADE;
TRUNCATE TABLE quiz_questions CASCADE;
TRUNCATE TABLE quizzes CASCADE;
TRUNCATE TABLE case_notes CASCADE;
TRUNCATE TABLE evidence CASCADE;
TRUNCATE TABLE complaints CASCADE;
TRUNCATE TABLE progress CASCADE;
TRUNCATE TABLE teen_modules CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE organizations CASCADE;

-- 1. ORGANIZATIONS
INSERT INTO organizations (id, name, type, code, address, contact_email, contact_phone, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'TeenTalk Global Network', 'system', 'ORG-SYS-001', 'Tech Hub 4, Innovation Park', 'admin@teentalk.org', '+91 98765 00000', 'active'),
    ('22222222-2222-2222-2222-222222222222', 'Greenwood International High', 'school', 'ORG-SCH-002', '12 Lakeview Road, Bangalore', 'contact@greenwoodhigh.edu', '+91 98765 11111', 'active'),
    ('33333333-3333-3333-3333-333333333333', 'SafeHaven Child Welfare NGO', 'ngo', 'ORG-NGO-003', '78 Hope Street, Mumbai', 'support@safehaven.org', '+91 98765 22222', 'active'),
    ('44444444-4444-4444-4444-444444444444', 'Apex Software Technologies Inc', 'corporate', 'ORG-CORP-004', 'Cyber City Tower B, Pune', 'posh@apextech.com', '+91 98765 33333', 'active');

-- Bcrypt hash for password: "Password123!"
-- '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae'

-- 2. SAMPLE USERS FOR ALL 10 ROLES
INSERT INTO users (id, auth_id, email, password_hash, full_name, role, org_id, is_blocked)
VALUES
    -- Super Admin
    ('a0000001-0000-0000-0000-000000000001', gen_random_uuid(), 'admin@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Tejas Kulkarni (Super Admin)', 'super_admin', '11111111-1111-1111-1111-111111111111', FALSE),
    -- Teen User
    ('a0000002-0000-0000-0000-000000000002', gen_random_uuid(), 'teen@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Payal Sharma (Teen Learner)', 'teen', '22222222-2222-2222-2222-222222222222', FALSE),
    -- Adult / Parent
    ('a0000003-0000-0000-0000-000000000003', gen_random_uuid(), 'adult@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Harshada Patil (Parent Guardian)', 'adult', '22222222-2222-2222-2222-222222222222', FALSE),
    -- School Admin
    ('a0000004-0000-0000-0000-000000000004', gen_random_uuid(), 'school@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Principal Rajiv Nair', 'school_admin', '22222222-2222-2222-2222-222222222222', FALSE),
    -- Employee
    ('a0000005-0000-0000-0000-000000000005', gen_random_uuid(), 'employee@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Nisha Verma (Employee)', 'employee', '44444444-4444-4444-4444-444444444444', FALSE),
    -- HR Admin
    ('a0000006-0000-0000-0000-000000000006', gen_random_uuid(), 'hr@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Anita Sen (POSH IC Lead)', 'hr', '44444444-4444-4444-4444-444444444444', FALSE),
    -- NGO Officer
    ('a0000007-0000-0000-0000-000000000007', gen_random_uuid(), 'ngo@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Vikram Seth (Child Welfare NGO)', 'ngo', '33333333-3333-3333-3333-333333333333', FALSE),
    -- Counselor
    ('a0000008-0000-0000-0000-000000000008', gen_random_uuid(), 'counselor@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Dr. Meera Joshi (Licensed Counselor)', 'counselor', '33333333-3333-3333-3333-333333333333', FALSE),
    -- Content Manager
    ('a0000009-0000-0000-0000-000000000009', gen_random_uuid(), 'content@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Rohan Gupta (Curriculum Designer)', 'content_manager', '11111111-1111-1111-1111-111111111111', FALSE),
    -- Auditor
    ('a0000010-0000-0000-0000-000000000010', gen_random_uuid(), 'auditor@teentalk.org', '$2a$10$wO0i05/xO3zN8h3iN7l6yeD4uEwD8r5C1u7C/7XW/yJp7ZcE5fHae', 'Sunil Deshmukh (Compliance Auditor)', 'auditor', '11111111-1111-1111-1111-111111111111', FALSE);

-- 3. TEEN MODULES
INSERT INTO teen_modules (id, title, slug, category, description, content, reading_time_mins, order_index, is_published, author_id)
VALUES
    (
        'b0000001-0000-0000-0000-000000000001',
        'Cyber Safety & Social Media Privacy',
        'cyber-safety-social-media',
        'cyber_safety',
        'Learn how to secure your accounts, detect phishing links, and protect yourself from online impostors.',
        '### Understanding Digital Threats\nIn the digital age, your online identity is as valuable as your physical identity. Cybercriminals often use social engineering—manipulating people into giving up confidential information.\n\n#### Key Best Practices:\n1. **Two-Factor Authentication (2FA)**: Never share OTPs.\n2. **Privacy Settings**: Keep your social profiles private to people you know in real life.\n3. **Think Before You Click**: Avoid clicking shortened links sent by unverified accounts.\n\nRemember: If something online feels too good to be true, or makes you feel unsafe, talk to a trusted adult immediately.',
        6,
        1,
        TRUE,
        'a0000009-0000-0000-0000-000000000009'
    ),
    (
        'b0000002-0000-0000-0000-000000000002',
        'Personal Boundaries & Safe Touch',
        'personal-boundaries-safe-touch',
        'safe_touch_boundaries',
        'Recognize healthy physical and emotional boundaries, and learn when and how to firmly say NO.',
        '### Your Body, Your Right\nEvery individual has the right to feel safe in their physical space. Personal boundaries define where you end and others begin.\n\n#### The Boundary Framework:\n- **Safe Touch**: Makes you feel cared for, comfortable, and respected (like a high-five from a teammate).\n- **Unsafe Touch**: Causes pain or distress.\n- **Confusing / Secret Touch**: Anyone telling you to keep a touch a "secret" from your parents or guardians is violating boundaries.\n\n**The Rule of Three**: 1) Say NO clearly. 2) Move away. 3) Tell an adult you trust until someone listens.',
        7,
        2,
        TRUE,
        'a0000009-0000-0000-0000-000000000009'
    ),
    (
        'b0000003-0000-0000-0000-000000000003',
        'Recognizing & Standing Up to Bullying',
        'anti-bullying-upstander',
        'anti_bullying',
        'Discover the difference between a bystander and an upstander, and how to safely de-escalate bullying situations.',
        '### Bullying in Schools & Online\nBullying is repetitive, aggressive behavior involving an imbalance of power. It can be verbal, physical, social, or cyberbullying.\n\n#### How to Be an Upstander:\n- Do not laugh or join in.\n- Offer support to the victim in private.\n- Report the incident to teachers or counselors.\n- Use TeenTalk confidential reporting if you fear retaliation.\n\nYou have the power to make your school a safe space for everyone.',
        5,
        3,
        TRUE,
        'a0000009-0000-0000-0000-000000000009'
    ),
    (
        'b0000004-0000-0000-0000-000000000004',
        'Emotional Wellbeing & Stress Management',
        'emotional-wellbeing-stress',
        'emotional_wellbeing',
        'Practical mindfulness exercises, anxiety regulation techniques, and healthy coping mechanisms for students.',
        '### Caring for Your Mental Health\nExam pressure, peer relationships, and hormonal changes can feel overwhelming. Stress is normal, but chronic anxiety needs care.\n\n#### The 5-4-3-2-1 Grounding Technique:\n- 5 things you can see\n- 4 things you can physically touch\n- 3 things you can hear\n- 2 things you can smell\n- 1 thing you can taste\n\nTake deep belly breaths and remember that asking for help is a sign of courage, not weakness.',
        6,
        4,
        TRUE,
        'a0000009-0000-0000-0000-000000000009'
    ),
    (
        'b0000005-0000-0000-0000-000000000005',
        'POSH Awareness & Respectful Workplaces',
        'posh-awareness-interns',
        'posh_awareness',
        'Essential guidelines on Prevention of Sexual Harassment (POSH) for young interns, trainees, and employees.',
        '### Understanding the POSH Act\nThe Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 safeguards every employee, apprentice, intern, and visitor.\n\n#### What Constitutes Harassment?\n- Unwelcome physical contact or advances\n- Demand or request for sexual favors\n- Sexually colored remarks\n- Showing pornography or unsolicited suggestive media\n- Quid pro quo (promising grades or appraisal in exchange for favors)\n\nEvery organization must have an Internal Committee (IC) to handle complaints impartially.',
        8,
        5,
        TRUE,
        'a0000009-0000-0000-0000-000000000009'
    );

-- 4. QUIZZES
INSERT INTO quizzes (id, module_id, title, description, passing_score, time_limit_mins, is_active)
VALUES
    (
        'c0000001-0000-0000-0000-000000000001',
        'b0000001-0000-0000-0000-000000000001',
        'Cyber Safety Mastery Quiz',
        'Test your knowledge on social media security, 2FA, and phishing defenses.',
        70,
        10,
        TRUE
    ),
    (
        'c0000002-0000-0000-0000-000000000002',
        'b0000002-0000-0000-0000-000000000002',
        'Personal Boundaries Check',
        'Assess your ability to identify safe touch, unsafe touch, and boundary violations.',
        75,
        10,
        TRUE
    );

-- 5. QUIZ QUESTIONS
INSERT INTO quiz_questions (id, quiz_id, question_text, options, correct_answer, explanation, order_index)
VALUES
    (
        'd0000001-0000-0000-0000-000000000001',
        'c0000001-0000-0000-0000-000000000001',
        'What should you do if an unknown online gamer asks you for your home address or school name?',
        '[{"id": "A", "text": "Give a false address to fool them"}, {"id": "B", "text": "Politely refuse, do not share personal details, and block/report if they persist"}, {"id": "C", "text": "Share the details if they promise free in-game currency"}, {"id": "D", "text": "Ask them for their address first"}]'::JSONB,
        'B',
        'Never share personally identifiable information (PII) like home address, school, or phone number with online contacts.',
        1
    ),
    (
        'd0000002-0000-0000-0000-000000000002',
        'c0000001-0000-0000-0000-000000000001',
        'What is Two-Factor Authentication (2FA)?',
        '[{"id": "A", "text": "Having two different passwords for one account"}, {"id": "B", "text": "Logging in from two devices at the same time"}, {"id": "C", "text": "A security process where a user provides two different authentication factors to verify themselves"}, {"id": "D", "text": "Changing your password every two months"}]'::JSONB,
        'C',
        '2FA adds a critical second layer of protection (e.g. password + authenticator code or SMS OTP).',
        2
    ),
    (
        'd0000003-0000-0000-0000-000000000003',
        'c0000001-0000-0000-0000-000000000001',
        'Which of the following is a classic indicator of a phishing email or DM?',
        '[{"id": "A", "text": "Urgent language demanding immediate action to avoid account suspension"}, {"id": "B", "text": "Mismatched sender domain address"}, {"id": "C", "text": "Grammatical errors and suspicious shortened links"}, {"id": "D", "text": "All of the above"}]'::JSONB,
        'D',
        'Phishing scams frequently use artificial urgency, spoofed addresses, and sketchy links.',
        3
    ),
    (
        'd0000004-0000-0000-0000-000000000004',
        'c0000002-0000-0000-0000-000000000002',
        'If an adult or peer touches you in a way that makes you feel uneasy and tells you to keep it a secret, what should you do?',
        '[{"id": "A", "text": "Keep the secret so they do not get angry"}, {"id": "B", "text": "Say NO clearly, get away, and immediately tell a parent, teacher, or trusted adult"}, {"id": "C", "text": "Wait to see if it happens again"}, {"id": "D", "text": "Blame yourself for being in that situation"}]'::JSONB,
        'B',
        'No secret touch is acceptable. Tell a trusted adult right away regardless of what the person claims.',
        1
    );

-- 6. SAMPLE PROGRESS
INSERT INTO progress (id, user_id, module_id, status, completed_at, score, time_spent_seconds)
VALUES
    (
        'e0000001-0000-0000-0000-000000000001',
        'a0000002-0000-0000-0000-000000000002',
        'b0000001-0000-0000-0000-000000000001',
        'completed',
        NOW() - INTERVAL '2 days',
        100,
        420
    ),
    (
        'e0000002-0000-0000-0000-000000000002',
        'a0000002-0000-0000-0000-000000000002',
        'b0000002-0000-0000-0000-000000000002',
        'in_progress',
        NULL,
        40,
        180
    );

-- 7. SAMPLE COMPLAINTS
INSERT INTO complaints (id, tracking_code, user_id, org_id, title, category, description, incident_date, is_anonymous, severity, status, assigned_to, consent_confirmed)
VALUES
    (
        'f0000001-0000-0000-0000-000000000001',
        'TT-CASE-2026-8941',
        'a0000005-0000-0000-0000-000000000005',
        '44444444-4444-4444-4444-444444444444',
        'Inappropriate WhatsApp messages after working hours',
        'posh_harassment',
        'A senior project manager sent multiple unsolicited personal messages and suggestive remarks after 10 PM.',
        CURRENT_DATE - INTERVAL '5 days',
        FALSE,
        'high',
        'under_review',
        'a0000006-0000-0000-0000-000000000006',
        TRUE
    ),
    (
        'f0000002-0000-0000-0000-000000000002',
        'TT-CASE-2026-4412',
        NULL, -- Anonymous report
        '22222222-2222-2222-2222-222222222222',
        'Repeated online harassment in class Discord group',
        'cyberbullying',
        'Anonymous harassment and meme mocking targeted at grade 9 students by seniors.',
        CURRENT_DATE - INTERVAL '2 days',
        TRUE,
        'medium',
        'submitted',
        NULL,
        TRUE
    );

-- 8. SAMPLE CASE NOTES
INSERT INTO case_notes (id, complaint_id, author_id, note_text, is_private)
VALUES
    (
        '90000001-0000-0000-0000-000000000001',
        'f0000001-0000-0000-0000-000000000001',
        'a0000006-0000-0000-0000-000000000006',
        'Initial review completed. Internal Committee (IC) quorum formed. Notice will be issued to respondent within 3 working days.',
        TRUE
    );

-- 9. SAMPLE MOOD LOGS
INSERT INTO mood_logs (id, user_id, mood_rating, emotions, note, logged_at)
VALUES
    (
        '80000001-0000-0000-0000-000000000001',
        'a0000002-0000-0000-0000-000000000002',
        4,
        '["Relieved", "Optimistic"]'::JSONB,
        'Finished my cyber safety module and understood how to protect my online games.',
        NOW() - INTERVAL '1 day'
    ),
    (
        '80000002-0000-0000-0000-000000000002',
        'a0000002-0000-0000-0000-000000000002',
        3,
        '["Tired", "Reflective"]'::JSONB,
        'Midterms are starting next week, feeling a bit stressed.',
        NOW()
    );

-- 10. SAMPLE CERTIFICATE
INSERT INTO certificates (id, certificate_code, user_id, module_id, issue_date, score, verification_hash)
VALUES
    (
        '70000001-0000-0000-0000-000000000001',
        'CERT-TT-2026-0091',
        'a0000002-0000-0000-0000-000000000002',
        'b0000001-0000-0000-0000-000000000001',
        NOW() - INTERVAL '2 days',
        100,
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    );

-- 11. SAMPLE AUDIT LOGS
INSERT INTO audit_logs (id, actor_id, action, resource_type, resource_id, ip_address, details)
VALUES
    (
        '60000001-0000-0000-0000-000000000001',
        'a0000001-0000-0000-0000-000000000001',
        'SYSTEM_INITIALIZED',
        'system',
        'core',
        '127.0.0.1',
        '{"version": "1.0.0", "status": "all_services_operational"}'::JSONB
    );
