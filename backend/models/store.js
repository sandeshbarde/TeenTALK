const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Generate synced hash for Password123!
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('Password123!', 10);

class DataStore {
  constructor() {
    this.snapshotPath = path.join(__dirname, '../data/store_snapshot.json');
    this.reset();
    this.loadSnapshot();
  }

  saveSnapshot() {
    const env = require('../config/env');
    if (!env.PERSIST_DATA) return;

    try {
      const dataDir = path.dirname(this.snapshotPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const state = {
        organizations: this.organizations,
        users: this.users,
        teen_modules: this.teen_modules,
        scenarios: this.scenarios,
        progress: this.progress,
        complaints: this.complaints,
        evidence: this.evidence,
        case_notes: this.case_notes,
        counselor_slots: this.counselor_slots,
        quizzes: this.quizzes,
        quiz_questions: this.quiz_questions,
        quiz_results: this.quiz_results,
        mood_logs: this.mood_logs,
        certificates: this.certificates,
        audit_logs: this.audit_logs,
        employee_documentation: this.employee_documentation,
      };

      const tmpPath = `${this.snapshotPath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2), 'utf8');
      fs.renameSync(tmpPath, this.snapshotPath);
    } catch (err) {
      console.warn('Data snapshot save warning:', err.message);
    }
  }

  loadSnapshot() {
    const env = require('../config/env');
    if (!env.PERSIST_DATA) return;

    try {
      if (fs.existsSync(this.snapshotPath)) {
        const raw = fs.readFileSync(this.snapshotPath, 'utf8');
        const state = JSON.parse(raw);
        Object.keys(state).forEach((key) => {
          if (Array.isArray(state[key])) {
            this[key] = state[key];
          }
        });
        console.log('📦 Data snapshot successfully restored from disk.');
      }
    } catch (err) {
      console.warn('Data snapshot restore warning:', err.message);
    }
  }

  reset() {
    this.organizations = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'TeenTalk Global Network',
        type: 'system',
        code: 'ORG-SYS-001',
        address: 'Tech Hub 4, Innovation Park',
        contact_email: 'admin@teentalk.org',
        contact_phone: '+91 98765 00000',
        status: 'active',
        created_at: new Date().toISOString(),
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Greenwood International High',
        type: 'school',
        code: 'ORG-SCH-002',
        address: '12 Lakeview Road, Bangalore',
        contact_email: 'contact@greenwoodhigh.edu',
        contact_phone: '+91 98765 11111',
        status: 'active',
        created_at: new Date().toISOString(),
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'SafeHaven Child Welfare NGO',
        type: 'ngo',
        code: 'ORG-NGO-003',
        address: '78 Hope Street, Mumbai',
        contact_email: 'support@safehaven.org',
        contact_phone: '+91 98765 22222',
        status: 'active',
        created_at: new Date().toISOString(),
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Apex Software Technologies Inc',
        type: 'corporate',
        code: 'ORG-CORP-004',
        address: 'Cyber City Tower B, Pune',
        contact_email: 'posh@apextech.com',
        contact_phone: '+91 98765 33333',
        status: 'active',
        created_at: new Date().toISOString(),
      },
    ];

    this.users = [
      {
        id: 'a0000001-0000-0000-0000-000000000001',
        email: 'admin@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Tejas Kulkarni (Super Admin)',
        role: 'super_admin',
        age_group: '26-40',
        org_id: '11111111-1111-1111-1111-111111111111',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000002-0000-0000-0000-000000000002',
        email: 'teen@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Payal Sharma (Teen Learner)',
        role: 'teen',
        age_group: '14-17',
        org_id: '22222222-2222-2222-2222-222222222222',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000003-0000-0000-0000-000000000003',
        email: 'adult@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Harshada Patil (Parent Guardian)',
        role: 'adult',
        age_group: '26-40',
        org_id: '22222222-2222-2222-2222-222222222222',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000004-0000-0000-0000-000000000004',
        email: 'school@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Principal Rajiv Nair',
        role: 'school_admin',
        age_group: '41-50',
        org_id: '22222222-2222-2222-2222-222222222222',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000005-0000-0000-0000-000000000005',
        email: 'hr@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Nisha Singhania (POSH Committee)',
        role: 'hr',
        age_group: '26-40',
        org_id: '44444444-4444-4444-4444-444444444444',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000006-0000-0000-0000-000000000006',
        email: 'employee@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Rahul Varma (Apex Employee)',
        role: 'employee',
        age_group: '18-25',
        org_id: '44444444-4444-4444-4444-444444444444',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000007-0000-0000-0000-000000000007',
        email: 'ngo@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Vikram Seth (Child Welfare NGO)',
        role: 'ngo',
        age_group: '41-50',
        org_id: '33333333-3333-3333-3333-333333333333',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000008-0000-0000-0000-000000000008',
        email: 'counselor@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Dr. Meera Joshi (Licensed Counselor)',
        role: 'counselor',
        age_group: '26-40',
        org_id: '33333333-3333-3333-3333-333333333333',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000009-0000-0000-0000-000000000009',
        email: 'content@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Rohan Gupta (Curriculum Designer)',
        role: 'content_manager',
        age_group: '26-40',
        org_id: '11111111-1111-1111-1111-111111111111',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'a0000010-0000-0000-0000-000000000010',
        email: 'auditor@teentalk.org',
        password_hash: DEFAULT_PASSWORD_HASH,
        full_name: 'Sunil Deshmukh (Compliance Auditor)',
        role: 'auditor',
        age_group: '41-50',
        org_id: '11111111-1111-1111-1111-111111111111',
        is_blocked: false,
        created_at: new Date().toISOString(),
      },
    ];

    // ALL MODULES WITH AUDIENCE SEPARATION
    this.teen_modules = [
      // --- PART B: THE 5 REQUIRED TEEN LEARNING MODULES ---
      {
        id: 'teen-mod-01',
        module_number: 1,
        title: 'Understanding Yourself & Your Identity',
        slug: 'understanding-yourself-identity',
        category: 'Self Discovery & Identity',
        audience: 'teen',
        target_age_group: '10-17',
        description: 'Explore self-concept, recognize your unique qualities, build genuine self-worth, and navigate adolescent identity.',
        content: `### Understanding Yourself & Your Identity\nAdolescence is the phase where you transition from childhood to young adulthood. Discovering who you are is one of the most exciting and essential parts of growing up.\n\n#### 1. What is Self-Concept?\nYour self-concept is the overall picture you hold of yourself—your personality, skills, values, and passions. It is normal for this picture to evolve as you discover new interests.\n\n#### 2. Building Real Self-Esteem:\n- **Focus on strengths**: Celebrate your talents and efforts, rather than comparing yourself to curated social media feeds.\n- **Positive internal self-talk**: Notice when your inner critic is harsh. Replace self-judgment with encouraging thoughts.\n- **Embrace your uniqueness**: Differences in background, passions, and ideas make communities vibrant.\n\n#### 3. Navigating Identity Pressures:\nYou do not need to fit into a single box or stereotype. Give yourself permission to explore who you are at your own pace.`,
        reading_time_mins: 5,
        duration: '5 mins',
        order_index: 1,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'teen-mod-02',
        module_number: 2,
        title: 'Consent: Understanding Yes, No & Maybe',
        slug: 'consent-understanding-yes-no-maybe',
        category: 'Consent & Personal Boundaries',
        audience: 'teen',
        target_age_group: '10-17',
        description: 'Learn what consent truly means, the FRIES model, respecting personal physical and digital space, and stating clear boundaries.',
        content: `### Consent: Understanding Yes, No & Maybe\nConsent is about mutual respect, bodily autonomy, and clear communication in everyday relationships, friendships, and online.\n\n#### 1. What Does Consent Mean?\nConsent is permission given freely without fear, force, trickery, or pressure. If someone is hesitant, scared, or silent, that is NOT consent.\n\n#### 2. The FRIES Framework:\n- **Freely given**: Made without guilt-tripping or intimidation.\n- **Reversible**: Anyone can change their mind at any moment.\n- **Informed**: Knowing what is happening without deception.\n- **Enthusiastic**: Both individuals actively agree and feel safe.\n- **Specific**: Saying yes to one thing does not mean yes to another.\n\n#### 3. Everyday Boundaries:\nWhether it is lending study notes, taking photos, hugging, or sharing game passwords—everyone deserves to have their boundary respected immediately without argument.`,
        reading_time_mins: 6,
        duration: '6 mins',
        order_index: 2,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'teen-mod-03',
        module_number: 3,
        title: 'Body Changes During Adolescence',
        slug: 'body-changes-during-adolescence',
        category: 'Adolescence & Puberty',
        audience: 'teen',
        target_age_group: '10-17',
        description: 'Understand the biological and hormonal changes of puberty, growth spurts, emotional shifts, and healthy body image.',
        content: `### Body Changes During Adolescence\nPuberty is the biological process by which a child's body matures into an adult body capable of reproduction. It is completely natural, healthy, and universal.\n\n#### 1. Physical Transformations:\n- **Growth spurts**: Rapid increases in height, bone density, and muscle.\n- **Skin and sweat**: Hormones activate sweat and sebaceous glands, which can lead to body odor and acne.\n- **Voice and hair changes**: Deepening voices, development of body hair across different stages.\n\n#### 2. Emotional and Neurological Growth:\nThe emotional center of your brain (the amygdala) develops faster than the decision-making prefrontal cortex. This causes heightened emotions, vulnerability to stress, and intense feelings.\n\n#### 3. Normalizing Your Pace:\nPuberty does not happen on an identical schedule for everyone. Starting earlier or later than classmates is completely normal. Treat your body with respect and care.`,
        reading_time_mins: 6,
        duration: '6 mins',
        order_index: 3,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'teen-mod-04',
        module_number: 4,
        title: 'Periods, Hygiene & Menstrual Health',
        slug: 'periods-hygiene-menstrual-health',
        category: 'Hygiene & Menstrual Health',
        audience: 'teen',
        target_age_group: '10-17',
        description: 'Demystifying menstruation, menstrual cycles, hygienic practices, symptom relief, and dismantling societal stigma.',
        content: `### Periods, Hygiene & Menstrual Health\nMenstruation is a normal, healthy biological cycle that occurs in females. Understanding how it works replaces confusion with scientific confidence.\n\n#### 1. What is Menstruation?\nEach month, the uterus prepares a soft lining for a potential pregnancy. If no egg is fertilized, the body sheds this tissue through the vagina as a menstrual period lasting typically 3 to 7 days.\n\n#### 2. Essential Menstrual Hygiene Rules:\n- **Change pads/materials regularly**: Every 4 to 6 hours to prevent bacterial infections.\n- **Clean water and mild soap**: Wash the genital area with clean water from front to back.\n- **Safe disposal**: Wrap used products in paper and dispose of them in a trash bin; never flush.\n\n#### 3. Managing Discomfort & Busting Myths:\nPeriods do NOT make anyone impure, weak, or sick. Gentle exercise, hydration, warm compresses, and balanced nutrition relieve common cramps. Speak to a health professional or counselor if pain is severe.`,
        reading_time_mins: 7,
        duration: '7 mins',
        order_index: 4,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'teen-mod-05',
        module_number: 5,
        title: 'Peer Pressure & Making Your Own Decisions',
        slug: 'peer-pressure-making-decisions',
        category: 'Peer Pressure & Decision Making',
        audience: 'teen',
        target_age_group: '10-17',
        description: 'Spot subtle peer pressure, develop assertive communication scripts, make sound ethical choices, and protect your integrity.',
        content: `### Peer Pressure & Making Your Own Decisions\nThe desire to belong and be accepted by peers is very strong during teenage years. However, true friends support your wellbeing rather than pressuring you.\n\n#### 1. Types of Peer Pressure:\n- **Direct**: Overtly daring or teasing you to break rules, drink, smoke, or cheat.\n- **Indirect**: Conforming silently to fit in because "everyone else is doing it".\n- **Digital**: Demanding instant replies, sharing private photos, or participating in mean group chats.\n\n#### 2. The 3-Step Decision Filter:\nBefore making an impulsive choice, ask yourself:\n1. Is this physically and emotionally safe for me?\n2. Does this align with my personal ethics and family values?\n3. Would I feel proud if my parents or future self saw this?\n\n#### 3. Saying No with Power:\nUse clear "I" statements: *"I'm not comfortable doing that, let's do something else instead."* Genuine friends will always respect your stance.`,
        reading_time_mins: 5,
        duration: '5 mins',
        order_index: 5,
        is_published: true,
        created_at: new Date().toISOString(),
      },

      // --- PART B: THE 6 REQUIRED EMPLOYEE LEARNING MODULES ---
      {
        id: 'emp-mod-01',
        module_number: 1,
        title: 'Workplace Harassment: Know Your Rights',
        slug: 'workplace-harassment-know-your-rights',
        category: 'Workplace Rights',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Fundamental rights of workers, legal boundaries in professional environments, and zero-tolerance harassment standards.',
        content: `### Workplace Harassment: Know Your Rights\nEvery employee, apprentice, intern, and consultant has the fundamental right to a dignified, secure, and harassment-free working environment.\n\n#### 1. What is Workplace Harassment?\nWorkplace harassment encompasses any unwelcome conduct—verbal, non-verbal, physical, or visual—that creates an intimidating, hostile, or humiliating work atmosphere.\n\n#### 2. Legal Protections Guaranteed:\n- The right to work free from gender-based hostility.\n- The right to equal professional opportunity without quid pro quo demands.\n- Absolute legal protection against retaliatory termination, unfavorable appraisal, or transfer for filing a complaint.\n\n#### 3. Employer Duty of Care:\nEmployers are legally required to formulate a zero-tolerance policy, conduct regular employee sensitization workshops, and display redressal mechanisms prominently.`,
        reading_time_mins: 7,
        duration: '7 mins',
        order_index: 1,
        image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'emp-mod-02',
        module_number: 2,
        title: 'POSH Act: A Simple Guide for Employees',
        slug: 'posh-act-simple-guide-employees',
        category: 'POSH Awareness',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Comprehensive plain-language guide to the POSH Act 2013, definition of aggrieved women, and mandatory committee structures.',
        content: `### POSH Act: A Simple Guide for Employees\nThe Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 is an Indian landmark legislation protecting women across all sectors.\n\n#### 1. Scope & Extended Workplace:\nThe POSH Act covers not just the physical office building, but any place visited by the employee arising out of or during the course of employment, including company transport, off-site client meetings, hotel stays during work trips, and virtual remote work environments.\n\n#### 2. Who is Protected?\nAny woman, whether employed permanently, temporarily, as an intern, trainee, or third-party vendor, is protected.\n\n#### 3. Key Obligations:\nOrganizations with 10 or more employees must constitute an Internal Committee (IC) to redress complaints within legally mandated timeframes.`,
        reading_time_mins: 8,
        duration: '8 mins',
        order_index: 2,
        image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'emp-mod-03',
        module_number: 3,
        title: 'Recognizing Sexual Harassment at Work',
        slug: 'recognizing-sexual-harassment-at-work',
        category: 'Inappropriate Conduct',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Identifying subtle and overt forms of inappropriate conduct, impact versus intent, and hostile work environments.',
        content: `### Recognizing Sexual Harassment at Work\nUnderstanding what constitutes sexual harassment is essential for maintaining mutual dignity.\n\n#### 1. Four Major Categories:\n- **Physical**: Unwelcome touching, brushing against someone, hugging without consent, cornering.\n- **Verbal**: Sexually colored remarks, intrusive questions about personal romantic life, crude jokes.\n- **Visual / Non-verbal**: Staring, leering, displaying sexually suggestive posters, memes, or screensavers.\n- **Quid Pro Quo**: Demanding sexual favors in return for hiring, promotions, positive appraisals, or threatening termination.\n\n#### 2. The Golden Rule: Impact Matters Over Intent:\nIt is the subjective impact on the recipient that determines harassment, not the intent of the perpetrator. "It was just a joke" is never a legal defense.`,
        reading_time_mins: 6,
        duration: '6 mins',
        order_index: 3,
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'emp-mod-04',
        module_number: 4,
        title: 'Digital Harassment & Workplace Communication',
        slug: 'digital-harassment-workplace-communication',
        category: 'Digital Workplace Safety',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Managing online boundaries across messaging apps, video calls, after-hours communications, and preserving digital evidence.',
        content: `### Digital Harassment & Workplace Communication\nWith remote working and messaging tools, professional boundaries frequently blur.\n\n#### 1. What is Virtual Harassment?\n- Sending unprofessional late-night WhatsApp/Slack messages unrelated to urgent job duties.\n- Forwarding inappropriate GIFs, emojis, or suggestive memes.\n- Insisting on cameras being on during informal late-night calls or making remarks about an employee's appearance at home.\n- Stalking colleagues' personal social media accounts or sending unwanted friend requests.\n\n#### 2. Best Practices for Remote Professionalism:\nKeep communications on official authorized channels. Document unwanted messages by taking full screenshots with visible timestamps and phone numbers.`,
        reading_time_mins: 6,
        duration: '6 mins',
        order_index: 4,
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'emp-mod-05',
        module_number: 5,
        title: 'Internal Committee (IC): Who Can You Approach?',
        slug: 'internal-committee-who-can-you-approach',
        category: 'Internal Committee Awareness',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Structure of the Internal Committee, role of external members, confidentiality guarantees, and accessibility.',
        content: `### Internal Committee (IC): Who Can You Approach?\nThe Internal Committee (IC) is the designated statutory body established inside organizations to prevent and redress workplace harassment.\n\n#### 1. Who Sits on the IC?\nBy law, the committee must include:\n- **Presiding Officer**: A senior woman employee.\n- **Employee Members**: At least two members committed to the cause of women.\n- **External Member**: An independent professional from an NGO or legal background to ensure unbiased proceedings.\n- **Gender Quorum**: At least 50% of the committee must be women.\n\n#### 2. Strict Confidentiality:\nAll records, complaints, identity of parties, and proceedings are legally confidential. Breaching confidentiality attracts heavy penalties under Section 16 of the Act.`,
        reading_time_mins: 7,
        duration: '7 mins',
        order_index: 5,
        image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'emp-mod-06',
        module_number: 6,
        title: 'How to Report Workplace Harassment',
        slug: 'how-to-report-workplace-harassment',
        category: 'Reporting Procedures',
        audience: 'employee',
        target_age_group: '18+',
        description: 'Complete redressal workflow: Filing complaints, conciliation vs formal inquiry, timeline limits, and interim relief.',
        content: `### How to Report Workplace Harassment\nKnowing how to navigate the reporting process empowers you and your peers to seek timely justice.\n\n#### 1. The 6-Step Redressal Flowchart:\n1. **Something feels wrong**: Trust your instincts and emotional safety.\n2. **Ensure immediate safety**: Remove yourself from immediate physical danger.\n3. **Record relevant details**: Note dates, times, location, verbatim words, and preserve screenshots or emails.\n4. **Check organization policy**: Review company POSH policy and IC contact channels.\n5. **Approach appropriate authority**: Submit written complaint within 3 months of the incident (extension available under justified reasons).\n6. **Follow applicable process**: Choose between Conciliation (no monetary settlement) or a formal 90-day inquiry.\n\n#### 2. Interim Relief:\nDuring the inquiry, you may request transfer to another department, 3 months paid leave, or a strict restraining directive barring the respondent from contacting you.`,
        reading_time_mins: 8,
        duration: '8 mins',
        order_index: 6,
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        is_published: true,
        created_at: new Date().toISOString(),
      },

      // --- LEGACY MODULES (Preserved for backward test compatibility: TT-TEEN-01, TT-CERT-01) ---
      {
        id: 'b0000001-0000-0000-0000-000000000001',
        title: 'Cyber Safety & Social Media Privacy',
        slug: 'cyber-safety-social-media',
        category: 'cyber_safety',
        audience: 'teen',
        target_age_group: '14-17',
        description: 'Learn how to secure your accounts, detect phishing links, and protect yourself from online impostors.',
        content: `### Understanding Digital Threats\nIn the digital age, your online identity is as valuable as your physical identity. Cybercriminals often use social engineering—manipulating people into giving up confidential information.\n\n#### Key Best Practices:\n1. **Two-Factor Authentication (2FA)**: Never share OTPs.\n2. **Privacy Settings**: Keep your social profiles private to people you know in real life.\n3. **Think Before You Click**: Avoid clicking shortened links sent by unverified accounts.`,
        reading_time_mins: 6,
        order_index: 101,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'b0000002-0000-0000-0000-000000000002',
        title: 'Personal Boundaries & Safe Touch Rules',
        slug: 'personal-boundaries-safe-touch',
        category: 'safe_touch_boundaries',
        audience: 'teen',
        target_age_group: '10-13',
        description: 'Recognize your body rights, comfortable vs uncomfortable touch, and building a circle of trusted adults.',
        content: `### Your Body Belongs to You!\nNo one has the right to make you feel uncomfortable, frightened, or confused in your own physical space.`,
        reading_time_mins: 5,
        order_index: 102,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'b0000003-0000-0000-0000-000000000003',
        title: 'Recognizing & Standing Up to Bullying',
        slug: 'anti-bullying-upstander',
        category: 'anti_bullying',
        audience: 'teen',
        target_age_group: '14-17',
        description: 'Discover the difference between a bystander and an upstander, and how to safely de-escalate bullying situations.',
        content: `### Bullying in Schools & Online\nBullying is repetitive, aggressive behavior involving an imbalance of power.`,
        reading_time_mins: 5,
        order_index: 103,
        is_published: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 'b0000004-0000-0000-0000-000000000004',
        title: 'Emotional Wellbeing & Stress Management',
        slug: 'emotional-wellbeing-stress',
        category: 'emotional_wellbeing',
        audience: 'teen',
        target_age_group: 'all',
        description: 'Practical mindfulness exercises, anxiety regulation techniques, and healthy coping mechanisms for students and women.',
        content: `### Caring for Your Mental Health\nExam pressure, peer relationships, and life transitions can feel overwhelming. Stress is normal, but chronic anxiety needs care.`,
        reading_time_mins: 6,
        order_index: 104,
        is_published: true,
        created_at: new Date().toISOString(),
      },
    ];

    // EMPLOYEE DOCUMENTATION SECTION RESOURCES
    this.employee_documentation = [
      {
        id: 'doc-01',
        title: 'Workplace Harassment Awareness',
        related_module_id: 'emp-mod-01',
        related_module_title: 'Workplace Harassment: Know Your Rights',
        category: 'Workplace Rights & Policy',
        overview: 'Official institutional guidance on worker dignity, protections against hostile work environments, and zero-tolerance commitments.',
        important_notes: [
          'Harassment is judged by its impact on the recipient, not the intent of the perpetrator.',
          'Retaliation against any employee reporting or witnessing harassment is strictly prohibited under company policy and the law.',
          'Applies equally to all full-time employees, contractors, interns, and site visitors.',
        ],
        reporting_guidance: 'If you witness or experience harassment, document times and details. You can report through the TeenTalk confidential system or directly to the IC Secretariat.',
      },
      {
        id: 'doc-02',
        title: 'POSH Act Employee Guide',
        related_module_id: 'emp-mod-02',
        related_module_title: 'POSH Act: A Simple Guide for Employees',
        category: 'Statutory Compliance',
        overview: 'Comprehensive handbook detailing the provisions of the Sexual Harassment of Women at Workplace Act 2013.',
        important_notes: [
          'Applies to extended workplaces including transit, off-sites, work parties, and digital communication.',
          'Employer is mandated by law to provide all necessary assistance to the aggrieved person.',
          'Inquiry must be concluded within 90 days of filing.',
        ],
        reporting_guidance: 'Complaints can be submitted within 3 months of the incident date. Extensions can be granted by the IC with written justification.',
      },
      {
        id: 'doc-03',
        title: 'Recognizing Sexual Harassment',
        related_module_id: 'emp-mod-03',
        related_module_title: 'Recognizing Sexual Harassment at Work',
        category: 'Conduct & Standards',
        overview: 'Exhaustive behavioral examples defining appropriate vs prohibited professional workplace conduct.',
        important_notes: [
          'Includes non-verbal cues: leering, invasive gestures, suggestive wallpapers or clothing remarks.',
          'Quid pro quo: Offering perks or promotions in exchange for personal favors is illegal.',
          'Hostile environment: Creating an uncomfortable, humiliating, or offensive setting.',
        ],
        reporting_guidance: 'Keep written records of any recurring pattern of unwelcome conduct. Witness testimonies enhance evidence during inquiry.',
      },
      {
        id: 'doc-04',
        title: 'Digital Workplace Safety',
        related_module_id: 'emp-mod-04',
        related_module_title: 'Digital Harassment & Workplace Communication',
        category: 'Cyber Safety & Remote Work',
        overview: 'Code of conduct for remote collaboration tools (Slack, Teams, Zoom, WhatsApp, and email).',
        important_notes: [
          'No late-night non-urgent work messaging without prior explicit consent.',
          'Strict prohibition on sharing non-work personal images, memes with innuendo, or suggestive emojis.',
          'Camera-on policies must respect employee personal privacy during non-standard hours.',
        ],
        reporting_guidance: 'Always capture unedited screenshots including the date, sender profile, and timestamp.',
      },
      {
        id: 'doc-05',
        title: 'Internal Committee Information',
        related_module_id: 'emp-mod-05',
        related_module_title: 'Internal Committee (IC): Who Can You Approach?',
        category: 'Contact & Institutional Redressal',
        overview: 'Official directory of the Internal Committee members and contact channels for confidential support.',
        ic_details: {
          presiding_officer: 'Smt. Ananya Deshmukh (Senior VP - Governance)',
          official_email: 'ic-posh@apextech.com',
          office_location: 'Apex Tech Tower B, 4th Floor, IC Secretariat Room 402, Cyber City, Pune',
          contact_number: '+91 98765 33333',
          working_hours: 'Monday to Friday, 9:00 AM – 6:00 PM IST',
          external_member: 'Adv. Sunita Rao (Child & Women Welfare Legal Expert, NGO Representative)',
        },
        important_notes: [
          'The IC operates with complete statutory autonomy from company management.',
          'All communication sent to ic-posh@apextech.com is encrypted and restricted to IC members.',
        ],
      },
      {
        id: 'doc-06',
        title: 'Reporting Workplace Harassment',
        related_module_id: 'emp-mod-06',
        related_module_title: 'How to Report Workplace Harassment',
        category: 'Workflow & SOP',
        overview: 'Detailed standard operating procedure (SOP) explaining how complaints are received, reviewed, and resolved.',
        process_flow: [
          { step: 1, title: 'Something feels wrong', desc: 'Acknowledge your discomfort and evaluate the situation without self-blame.' },
          { step: 2, title: 'Ensure immediate safety', desc: 'Step away from any immediate physical confrontation or distress.' },
          { step: 3, title: 'Record relevant details', desc: 'Document date, time, location, witnesses, and verbatim communications.' },
          { step: 4, title: 'Check organization policy', desc: 'Refer to the TeenTalk / Company POSH Redressal Handbook.' },
          { step: 5, title: 'Approach appropriate authority', desc: 'Submit a formal written complaint to the IC or file an incident on TeenTalk.' },
          { step: 6, title: 'Follow applicable process', desc: 'Participate in conciliation if requested, or the formal 90-day inquiry.' },
        ],
        important_notes: [
          'Interim relief: You can request paid leave up to 3 months or department transfer during inquiry.',
          'Strict legal confidentiality applies to both parties.',
        ],
      },
    ];

    this.scenarios = [
      {
        id: 'scenario-01',
        title: 'The Mystery Gamer & The Secret Photo',
        target_age_group: '10-13',
        character: 'Maya, age 12',
        setup: 'Maya is playing her favorite multiplayer craft game. A player with a high-level badge named "GamerSam" offers her rare game gems if she joins a private Discord chat and sends a selfie showing her school uniform.',
        choices: [
          {
            id: 'A',
            text: 'Send the selfie because rare gems are hard to get and it is just a photo.',
            feedback: 'Unsafe Choice! Never send personal photos or reveal your school uniform. People online can be impostors who misuse personal images.',
            is_safe: false,
          },
          {
            id: 'B',
            text: 'Refuse firmly, take a screenshot, block GamerSam, and immediately show Mom or Dad.',
            feedback: 'Hero Choice! You protected your personal privacy and alerted your trusted adult circle immediately.',
            is_safe: true,
          },
          {
            id: 'C',
            text: 'Ask the gamer to send their photo first to see if they are real.',
            feedback: 'Risky Choice! Online predators frequently use fake photos from the internet to trick people. Never negotiate personal information.',
            is_safe: false,
          },
        ],
      },
    ];

    this.progress = [
      {
        id: 'e0000001-0000-0000-0000-000000000001',
        user_id: 'a0000002-0000-0000-0000-000000000002',
        module_id: 'b0000001-0000-0000-0000-000000000001',
        status: 'completed',
        completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        score: 100,
        time_spent_seconds: 420,
      },
      {
        id: 'e0000002-0000-0000-0000-000000000002',
        user_id: 'a0000002-0000-0000-0000-000000000002',
        module_id: 'b0000002-0000-0000-0000-000000000002',
        status: 'in_progress',
        completed_at: null,
        score: 40,
        time_spent_seconds: 180,
      },
    ];

    this.complaints = [
      {
        id: 'f0000001-0000-0000-0000-000000000001',
        tracking_code: 'TT-CASE-2026-8941',
        title: 'Verbal bullying and exclusionary threats in hallway',
        category: 'bullying',
        description: 'Group of senior students routinely block the corridor and issue derogatory comments during lunch recess.',
        incident_date: '2026-03-01',
        severity: 'medium',
        status: 'submitted',
        is_anonymous: true,
        filer_id: null,
        org_id: '22222222-2222-2222-2222-222222222222',
        assigned_to: 'a0000004-0000-0000-0000-000000000004',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '525f8872-1aec-4945-a004-8dedf42375a3',
        tracking_code: 'TT-CASE-2026-0042',
        title: 'POSH inquiry regarding unsolicited late night messaging',
        category: 'posh_harassment',
        description: 'Persistent unsolicited personal messaging on private chat apps outside working hours despite explicit objections.',
        incident_date: '2026-02-28',
        severity: 'high',
        status: 'submitted',
        is_anonymous: false,
        filer_id: 'a0000006-0000-0000-0000-000000000006',
        org_id: '44444444-4444-4444-4444-444444444444',
        assigned_to: 'a0000005-0000-0000-0000-000000000005',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ];

    this.evidence = [];
    this.case_notes = [];
    this.counselor_slots = [];

    // QUIZZES
    this.quizzes = [
      // Comprehensive 10-Question Teen Learning Assessment
      {
        id: 'c0000003-0000-0000-0000-000000000003',
        module_id: 'teen-program',
        title: 'Teen Learning Assessment',
        description: 'Comprehensive 10-question evaluation covering self-discovery, identity, consent, adolescence, hygiene, menstrual health, and peer pressure.',
        passing_score: 70,
        time_limit_mins: 15,
        is_active: true,
      },
      // Existing quizzes for backwards test compatibility
      {
        id: 'c0000001-0000-0000-0000-000000000001',
        module_id: 'b0000001-0000-0000-0000-000000000001',
        title: 'Cyber Safety Mastery Quiz',
        description: 'Test your knowledge on social media security, 2FA, and phishing defenses.',
        passing_score: 70,
        time_limit_mins: 10,
        is_active: true,
      },
      {
        id: 'c0000002-0000-0000-0000-000000000002',
        module_id: 'b0000002-0000-0000-0000-000000000002',
        title: 'Personal Boundaries Check',
        description: 'Assess your ability to identify safe touch, unsafe touch, and boundary violations.',
        passing_score: 75,
        time_limit_mins: 10,
        is_active: true,
      },
    ];

    this.quiz_questions = [
      // 10 QUESTIONS FOR TEEN LEARNING ASSESSMENT
      {
        id: 'q-teen-01',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What is healthy self-esteem?',
        options: [
          { id: 'A', text: 'Thinking you are superior to all your peers' },
          { id: 'B', text: 'Respect and confidence in your own worth and abilities' },
          { id: 'C', text: 'Measuring your value solely by social media likes' },
          { id: 'D', text: 'Never admitting to making any mistakes' },
        ],
        correct_answer: 'B',
        explanation: 'Self-esteem is about healthy self-respect and recognizing your personal value with humility and courage.',
        order_index: 1,
      },
      {
        id: 'q-teen-02',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'How should you approach differences in culture, opinions, or backgrounds among peers?',
        options: [
          { id: 'A', text: 'With curiosity, empathy, and mutual respect' },
          { id: 'B', text: 'By making fun of people who are different' },
          { id: 'C', text: 'By avoiding people from different backgrounds' },
          { id: 'D', text: 'By forcing everyone to have the exact same viewpoint' },
        ],
        correct_answer: 'A',
        explanation: 'Respecting diversity builds welcoming, inclusive school and community environments.',
        order_index: 2,
      },
      {
        id: 'q-teen-03',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What does consent mean?',
        options: [
          { id: 'A', text: 'Permission given freely without pressure, manipulation, or force' },
          { id: 'B', text: 'Being forced or guilt-tripped into saying yes' },
          { id: 'C', text: 'Remaining completely silent while feeling uncomfortable' },
          { id: 'D', text: 'Ignoring another person’s personal boundaries' },
        ],
        correct_answer: 'A',
        explanation: 'Consent must always be freely given, reversible, informed, enthusiastic, and specific.',
        order_index: 3,
      },
      {
        id: 'q-teen-04',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What should you do if an acquaintance or peer asks you to do something that violates your boundaries?',
        options: [
          { id: 'A', text: 'Say YES to prevent them from feeling disappointed' },
          { id: 'B', text: 'Say NO firmly, step away, and speak to a trusted adult if needed' },
          { id: 'C', text: 'Agree secretly and feel distressed about it' },
          { id: 'D', text: 'Pretend it didn’t happen and hope they stop' },
        ],
        correct_answer: 'B',
        explanation: 'You always have the right to protect your physical and emotional boundaries.',
        order_index: 4,
      },
      {
        id: 'q-teen-05',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'Which of the following is true about puberty and adolescent body changes?',
        options: [
          { id: 'A', text: 'Puberty happens at the exact same age for everyone' },
          { id: 'B', text: 'It is a natural biological process that happens at different times for different bodies' },
          { id: 'C', text: 'Physical changes during puberty are something to feel ashamed of' },
          { id: 'D', text: 'Puberty only involves changes in height, with no emotional changes' },
        ],
        correct_answer: 'B',
        explanation: 'Puberty is universal, natural, and occurs at varying timelines for each individual.',
        order_index: 5,
      },
      {
        id: 'q-teen-06',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What is a constructive way to manage intense emotional mood shifts during teenage years?',
        options: [
          { id: 'A', text: 'Practicing box breathing, journaling, and talking to a trusted mentor or counselor' },
          { id: 'B', text: 'Lashing out aggressively at family members' },
          { id: 'C', text: 'Isolating yourself completely in your room for weeks' },
          { id: 'D', text: 'Ignoring all your feelings and bottling them up' },
        ],
        correct_answer: 'A',
        explanation: 'Active coping strategies and supportive human connections help regulate intense adolescent emotions.',
        order_index: 6,
      },
      {
        id: 'q-teen-07',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'Why does personal hygiene require extra attention during adolescence?',
        options: [
          { id: 'A', text: 'Hormones activate sweat glands and skin changes that require regular bathing and care' },
          { id: 'B', text: 'Hygiene is only necessary once a week' },
          { id: 'C', text: 'It is only necessary if you play competitive sports' },
          { id: 'D', text: 'Adolescent skin never produces oils or bacteria' },
        ],
        correct_answer: 'A',
        explanation: 'Daily bathing, washing clothes, and skin care prevent bacterial accumulation and maintain wellbeing.',
        order_index: 7,
      },
      {
        id: 'q-teen-08',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'Which of the following is a scientific fact regarding menstrual health (periods)?',
        options: [
          { id: 'A', text: 'Periods are dirty and people who menstruate must be isolated' },
          { id: 'B', text: 'Menstruation is a healthy biological cycle requiring clean, accessible hygiene products' },
          { id: 'C', text: 'Menstruating teens should never exercise or study' },
          { id: 'D', text: 'Periods are caused by eating spicy food' },
        ],
        correct_answer: 'B',
        explanation: 'Menstruation is a normal bodily process. Proper sanitary materials and pain relief ensure comfort and health.',
        order_index: 8,
      },
      {
        id: 'q-teen-09',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What is an example of negative peer pressure?',
        options: [
          { id: 'A', text: 'Friends encouraging you to form a study group' },
          { id: 'B', text: 'Peers urging you to bully another student or share private photos to fit in' },
          { id: 'C', text: 'A friend cheering for you in a school debate' },
          { id: 'D', text: 'Peers reminding you to wear a seatbelt' },
        ],
        correct_answer: 'B',
        explanation: 'Negative peer pressure urges you to violate your boundaries, rules, or safety to satisfy others.',
        order_index: 9,
      },
      {
        id: 'q-teen-10',
        quiz_id: 'c0000003-0000-0000-0000-000000000003',
        question_text: 'What is the most effective approach when facing a tough decision under pressure?',
        options: [
          { id: 'A', text: 'Act immediately without thinking about the outcome' },
          { id: 'B', text: 'Pause, consider the safety consequences and your values, and seek trusted advice' },
          { id: 'C', text: 'Let whoever shouts the loudest decide for you' },
          { id: 'D', text: 'Flip a coin and ignore your instincts' },
        ],
        correct_answer: 'B',
        explanation: 'Pausing and evaluating consequences ensures you make safe, value-aligned choices.',
        order_index: 10,
      },

      // EXISTING TEST QUESTIONS
      {
        id: 'd0000001-0000-0000-0000-000000000001',
        quiz_id: 'c0000001-0000-0000-0000-000000000001',
        question_text: 'What should you do if an unknown online gamer asks you for your home address or school name?',
        options: [
          { id: 'A', text: 'Give a false address to fool them' },
          { id: 'B', text: 'Politely refuse, do not share personal details, and block/report if they persist' },
          { id: 'C', text: 'Share the details if they promise free in-game currency' },
          { id: 'D', text: 'Ask them for their address first' },
        ],
        correct_answer: 'B',
        explanation: 'Never share personally identifiable information (PII).',
        order_index: 1,
      },
      {
        id: 'd0000002-0000-0000-0000-000000000002',
        quiz_id: 'c0000001-0000-0000-0000-000000000001',
        question_text: 'What is Two-Factor Authentication (2FA)?',
        options: [
          { id: 'A', text: 'Having two different passwords for one account' },
          { id: 'B', text: 'Logging in from two devices at the same time' },
          { id: 'C', text: 'A security process where a user provides two different authentication factors to verify themselves' },
          { id: 'D', text: 'Changing your password every two months' },
        ],
        correct_answer: 'C',
        explanation: '2FA adds a critical second layer of protection.',
        order_index: 2,
      },
      {
        id: 'd0000003-0000-0000-0000-000000000003',
        quiz_id: 'c0000001-0000-0000-0000-000000000001',
        question_text: 'Which of the following is a classic indicator of a phishing email or DM?',
        options: [
          { id: 'A', text: 'Urgent language demanding immediate action to avoid account suspension' },
          { id: 'B', text: 'Mismatched sender domain address' },
          { id: 'C', text: 'Grammatical errors and suspicious shortened links' },
          { id: 'D', text: 'All of the above' },
        ],
        correct_answer: 'D',
        explanation: 'Phishing scams frequently use artificial urgency.',
        order_index: 3,
      },
    ];

    this.quiz_results = [];
    this.mood_logs = [];

    this.certificates = [
      {
        id: '70000001-0000-0000-0000-000000000001',
        certificate_code: 'CERT-TT-2026-0091',
        user_id: 'a0000002-0000-0000-0000-000000000002',
        module_id: 'b0000001-0000-0000-0000-000000000001',
        program_type: 'teen',
        certificate_title: 'TeenTalk Teen Learning & Awareness Program',
        issue_date: new Date(Date.now() - 2 * 86400000).toISOString(),
        score: 100,
        verification_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
    ];

    this.audit_logs = [];
  }
}

const store = new DataStore();

module.exports = store;
