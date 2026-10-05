const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

// Handle JWT_SECRET with secure fallback if not explicitly provided
let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret || jwtSecret.length < 32) {
  const devSecretPath = path.join(__dirname, '../../.jwt_secret_dev');
  try {
    if (fs.existsSync(devSecretPath)) {
      jwtSecret = fs.readFileSync(devSecretPath, 'utf8').trim();
    }
  } catch (err) {}

  if (!jwtSecret || jwtSecret.length < 32) {
    jwtSecret = crypto.randomBytes(32).toString('hex');
    try {
      if (NODE_ENV !== 'production') {
        fs.writeFileSync(devSecretPath, jwtSecret, 'utf8');
      }
    } catch (err) {}
  }

  if (NODE_ENV === 'production') {
    console.warn('⚠️ [SECURITY WARNING] JWT_SECRET is missing or shorter than 32 characters. A cryptographically secure secret was generated automatically for this runtime. For persistent sessions across restarts, set JWT_SECRET in your environment variables.');
  }
}

// Handle EVIDENCE_ENCRYPTION_KEY with safe fallback
let evidenceEncryptionKey = process.env.EVIDENCE_ENCRYPTION_KEY;
if (!evidenceEncryptionKey) {
  if (NODE_ENV === 'test') {
    evidenceEncryptionKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  } else {
    // Derive a valid 64-hex-character (32-byte) AES key
    evidenceEncryptionKey = crypto.createHash('sha256').update(`teentalk-evidence-key:${jwtSecret}`).digest('hex');
    if (NODE_ENV === 'production') {
      console.warn('⚠️ [SECURITY WARNING] EVIDENCE_ENCRYPTION_KEY is not defined in production. A secure AES-256 key was derived automatically. Set EVIDENCE_ENCRYPTION_KEY in your environment variables for persistent encryption.');
    }
  }
}

const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV,
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  JWT_SECRET: jwtSecret,
  EVIDENCE_ENCRYPTION_KEY: evidenceEncryptionKey,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME || 'complaint-evidence',
  PERSIST_DATA: process.env.PERSIST_DATA === 'true' || process.env.PERSIST_DATA === '1',
};

if (config.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️ [DEPLOYMENT NOTICE] Running with auto-generated JWT_SECRET.');
  }
  if (!process.env.EVIDENCE_ENCRYPTION_KEY) {
    console.warn('⚠️ [DEPLOYMENT NOTICE] Running with auto-derived EVIDENCE_ENCRYPTION_KEY.');
  }
}

module.exports = config;
