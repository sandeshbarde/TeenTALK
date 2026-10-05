const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

// In development/test, if JWT_SECRET is not explicitly provided, generate or read from git-ignored file
let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (NODE_ENV === 'production') {
    throw new Error('Production requires a unique JWT_SECRET of at least 32 characters');
  } else {
    const devSecretPath = path.join(__dirname, '../../.jwt_secret_dev');
    try {
      if (fs.existsSync(devSecretPath)) {
        jwtSecret = fs.readFileSync(devSecretPath, 'utf8').trim();
      } else {
        jwtSecret = crypto.randomBytes(32).toString('hex');
        fs.writeFileSync(devSecretPath, jwtSecret, 'utf8');
      }
    } catch (err) {
      jwtSecret = crypto.randomBytes(32).toString('hex');
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
  EVIDENCE_ENCRYPTION_KEY: process.env.EVIDENCE_ENCRYPTION_KEY || (NODE_ENV === 'test' ? '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef' : ''),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000',
  STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME || 'complaint-evidence',
  PERSIST_DATA: process.env.PERSIST_DATA === 'true' || process.env.PERSIST_DATA === '1',
};

if (config.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('Production requires a unique JWT_SECRET of at least 32 characters');
  }
  if (!config.EVIDENCE_ENCRYPTION_KEY) {
    throw new Error('Production requires EVIDENCE_ENCRYPTION_KEY for encrypted evidence storage');
  }
}

module.exports = config;
