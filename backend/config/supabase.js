const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

let supabase = null;
let isSupabaseConfigured = false;

if (env.SUPABASE_URL && (env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY)) {
  try {
    const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
    supabase = createClient(env.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    isSupabaseConfigured = true;
    console.log('✅ Supabase client successfully initialized with provided credentials.');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️ Running in local/mock database store mode (Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env to connect to live Supabase).');
}

module.exports = {
  supabase,
  isSupabaseConfigured,
};
