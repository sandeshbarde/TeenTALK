const { v4: uuidv4 } = require('uuid');
const store = require('../models/store');
const { logAuditEvent } = require('../middleware/audit');

const getAllUsers = async (filters = {}) => {
  let list = [...store.users];

  if (filters.role) {
    list = list.filter(u => u.role === filters.role);
  }
  if (filters.org_id) {
    list = list.filter(u => u.org_id === filters.org_id);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(u => u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  return list.map(u => {
    const { password_hash, ...safe } = u;
    const org = store.organizations.find(o => o.id === u.org_id);
    return {
      ...safe,
      organization_name: org ? org.name : 'None / System',
    };
  });
};

const updateUser = async (adminId, userId, updates) => {
  const userIndex = store.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const allowedFields = ['full_name', 'role', 'org_id', 'is_blocked'];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      store.users[userIndex][field] = updates[field];
    }
  }

  store.users[userIndex].updated_at = new Date().toISOString();

  await logAuditEvent({
    actorId: adminId,
    action: 'ADMIN_USER_UPDATED',
    resourceType: 'user',
    resourceId: userId,
    details: updates,
  });

  const { password_hash, ...safe } = store.users[userIndex];
  return safe;
};

const deleteUser = async (adminId, userId) => {
  const userIndex = store.users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const removed = store.users.splice(userIndex, 1)[0];

  await logAuditEvent({
    actorId: adminId,
    action: 'ADMIN_USER_DELETED',
    resourceType: 'user',
    resourceId: userId,
    details: { email: removed.email, role: removed.role },
  });

  return { message: 'User deleted successfully', id: userId };
};

const getAllOrgs = async () => {
  return store.organizations.map(org => {
    const userCount = store.users.filter(u => u.org_id === org.id).length;
    const complaintCount = store.complaints.filter(c => c.org_id === org.id).length;
    return {
      ...org,
      total_members: userCount,
      total_incidents: complaintCount,
    };
  });
};

const createOrg = async (adminId, orgData) => {
  const code = orgData.code || `ORG-${orgData.type.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  const newOrg = {
    id: uuidv4(),
    name: orgData.name,
    type: orgData.type,
    code,
    address: orgData.address || '',
    contact_email: orgData.contact_email,
    contact_phone: orgData.contact_phone || '',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.organizations.push(newOrg);

  await logAuditEvent({
    actorId: adminId,
    action: 'ADMIN_ORG_CREATED',
    resourceType: 'organization',
    resourceId: newOrg.id,
    details: { name: newOrg.name, type: newOrg.type },
  });

  return newOrg;
};

const updateOrg = async (adminId, orgId, updates) => {
  const orgIndex = store.organizations.findIndex(o => o.id === orgId);
  if (orgIndex === -1) {
    const error = new Error('Organization not found');
    error.statusCode = 404;
    error.code = 'ORG_NOT_FOUND';
    throw error;
  }

  const allowedFields = ['name', 'address', 'contact_email', 'contact_phone', 'status'];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      store.organizations[orgIndex][field] = updates[field];
    }
  }

  store.organizations[orgIndex].updated_at = new Date().toISOString();

  await logAuditEvent({
    actorId: adminId,
    action: 'ADMIN_ORG_UPDATED',
    resourceType: 'organization',
    resourceId: orgId,
    details: updates,
  });

  return store.organizations[orgIndex];
};

const getAuditLogs = async (limit = 100) => {
  return store.audit_logs.slice(0, limit).map(log => {
    const actor = store.users.find(u => u.id === log.actor_id);
    return {
      ...log,
      actor_name: actor ? actor.full_name : 'System / Anonymous',
      actor_email: actor ? actor.email : null,
    };
  });
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllOrgs,
  createOrg,
  updateOrg,
  getAuditLogs,
};
