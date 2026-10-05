const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { supabase, isSupabaseConfigured } = require('../config/supabase');

/**
 * Log an audit action to both Supabase (if configured) and in-memory store
 */
const logAuditEvent = async ({ actorId, action, resourceType, resourceId, ipAddress, details = {} }) => {
  const auditEntry = {
    id: uuidv4(),
    actor_id: actorId || null,
    action,
    resource_type: resourceType,
    resource_id: resourceId ? String(resourceId) : null,
    ip_address: ipAddress || '127.0.0.1',
    details,
    created_at: new Date().toISOString(),
  };

  store.audit_logs.unshift(auditEntry);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('audit_logs').insert([auditEntry]);
    } catch (err) {
      console.error('[AUDIT_ERROR] Failed to persist audit log to Supabase:', err.message);
    }
  }

  return auditEntry;
};

module.exports = {
  logAuditEvent,
};
