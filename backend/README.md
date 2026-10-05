# Backend - TeenTalk REST API

Full-stack Node.js / Express REST API and PostgreSQL database system powering **TeenTalk** ("Learn safely. Grow confidently. Find support.").

Built for adolescent safety awareness, institutional compliance (POCSO & POSH Acts), confidential incident reporting with zero-knowledge tracking codes, AI crisis intervention, and cryptographic safety certifications.

---

## 🚀 Key Capabilities

- **10-Role Role-Based Access Control (RBAC)**: `teen`, `adult`, `employee`, `school_admin`, `hr`, `counselor`, `ngo`, `content_manager`, `super_admin`, `auditor`.
- **Confidential & Anonymous Incident Reporting**: Complainants receive an 8-digit tracking code without needing to provide identifiable contact details.
- **Private Evidence Vault**: Multi-part uploads for PDF, PNG, JPG, WEBP (up to 10MB) with token-authorized private streaming.
- **Crisis-Aware Educational AI**: Scans conversations for crisis/self-harm keywords and immediately triggers emergency hotline escalations (`1098 Childline`, `112 National Emergency`).
- **Cryptographic Certification**: Generates digitally verifiable certificates with SHA-256 integrity digests.
- **Dual-Mode Database**: Supports live **Supabase PostgreSQL** with Row Level Security (RLS) as well as an in-memory/mock repository store for instant testing out-of-the-box.

---

## 🛠️ Tech Stack & Dependencies

- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js
- **Security**: Helmet, CORS, Express Rate Limit, Bcrypt.js, JsonWebToken (JWT)
- **Database**: Supabase Auth & PostgreSQL (`@supabase/supabase-js`)
- **File Uploads**: Multer
- **Testing**: Built-in automated integration test runner

---

## 📦 Project Structure

```
backend/
├── config/
│   ├── env.js                # Environment variables & fallback defaults
│   ├── supabase.js           # Supabase client initialization
│   └── constants.js          # Roles, crisis numbers, categories
├── controllers/
│   ├── authController.js     # Register, login, profile management
│   ├── teenController.js     # Learning modules, progress, scenarios
│   ├── schoolController.js   # Student analytics & roster
│   ├── complaintController.js# Confidential filing & evidence streaming
│   ├── hrController.js       # POSH internal committee cases
│   ├── counselorController.js# Case notes & counseling calendar
│   ├── aiController.js       # Crisis keyword detection & chat
│   ├── quizController.js     # Quiz evaluations
│   ├── mentalHealthController.js # Mood logging & history
│   ├── certificateController.js  # SHA-256 certificate generation
│   └── adminController.js    # User management & audit logs
├── database/
│   ├── schema.sql            # 13 relational tables schema
│   ├── seeds.sql             # Seed data for all 10 roles
│   └── rls.sql               # Supabase Row Level Security policies
├── middleware/
│   ├── auth.js               # JWT verification (requireAuth, optionalAuth)
│   ├── rbac.js               # Role guard middleware
│   ├── orgScope.js           # Multi-tenant institutional isolation
│   ├── upload.js             # Multer file filter & size limits
│   ├── rateLimiter.js        # Global & auth rate limiters
│   └── errorHandler.js       # Centralized error responses
├── models/
│   └── store.js              # Dual-mode seeded repository store
├── routes/                   # Modular route mounts
├── services/                 # Business logic layer
├── tests/
│   └── runner.js             # 12 automated verification suites
├── validators/               # Input sanitization and schemas
├── Dockerfile                # Containerized deployment spec
├── server.js                 # HTTP server entrypoint
└── package.json
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file in this directory:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secure-jwt-secret
CORS_ORIGIN=http://localhost:5173
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```
*(If Supabase keys are not set, the backend seamlessly runs in seeded mock repository mode with all endpoints functional!)*

### 3. Start Server
```bash
npm start
```
The server will run on `http://localhost:5000`.  
Verify health check at: `http://localhost:5000/api/health`

### 4. Run Automated Tests
```bash
npm test
```
Executes all 12 test suites verifying Auth, RBAC, Complaints, Evidence filtering, AI Crisis Escalation, and Certification.

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t teentalk-backend .

# Run container
docker run -p 5000:5000 teentalk-backend
```

---

## 🔒 Security & Privacy Compliance

- **POCSO Act (2012)**: Minor identity protection & mandatory reporting protocols.
- **POSH Act (2013)**: Workplace harassment inquiry workflows & ICC notes isolation.
- **DPDP Act (2023)**: Data minimization, no tracking cookies, and user data rights.
- **Evidence Protection**: Attached evidence files are never exposed publicly; streaming requires valid authorization tokens.
