import React, { useState, useEffect } from 'react';
import { Users, Search, ShieldCheck, ShieldAlert, Trash2, CheckCircle2 } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useToast } from '../../hooks/useToast';
import { ROLE_LABELS, ALL_ROLES } from '../../constants';

export const UsersManagePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { showToast } = useToast();

  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/admin/users');
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      showToast('Failed to load user directory', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (user) => {
    try {
      const res = await apiClient.patch(`/admin/users/${user.id}`, {
        is_blocked: !user.is_blocked,
      });
      if (res.success) {
        showToast(`User ${user.is_blocked ? 'reactivated' : 'blocked'} successfully`, 'success');
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, is_blocked: !user.is_blocked } : u))
        );
      }
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await apiClient.delete(`/admin/users/${userId}`);
      if (res.success) {
        showToast('User removed from system', 'success');
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch (err) {
      showToast(err.message || 'Deletion failed', 'error');
    }
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <LoadingSpinner message="Loading user directory..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System User Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review user authorization across all 10 roles, manage accounts, and enforce access controls.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-48 bg-white border border-slate-200 text-xs rounded-xl py-2 px-3 outline-none"
          >
            <option value="all">All Roles</option>
            {Object.entries(ROLE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matching users found" description="Adjust your filters or search keywords." />
      ) : (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">User</th>
                  <th className="py-3.5 px-6">Role</th>
                  <th className="py-3.5 px-6">Organization</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800">
                      <div>{u.full_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-6">
                      <Badge variant="blue">{ROLE_LABELS[u.role] || u.role}</Badge>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {u.organization_name || 'System Level'}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {u.is_blocked ? (
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 text-[11px]">
                          Blocked
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <Button
                        variant={u.is_blocked ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleBlock(u)}
                      >
                        {u.is_blocked ? 'Unblock' : 'Block'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
