import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Shield, History, ArrowRight, CheckCircle } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({ users: 0, orgs: 0, logs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [usersRes, orgsRes, logsRes] = await Promise.all([
          apiClient.get('/admin/users'),
          apiClient.get('/admin/orgs'),
          apiClient.get('/admin/audit-logs?limit=5'),
        ]);

        setMetrics({
          users: usersRes.data?.length || 0,
          orgs: orgsRes.data?.length || 0,
          logs: logsRes.data?.length || 0,
          recentLogs: logsRes.data || [],
        });
      } catch (err) {
        console.error('Failed to load admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading system administration status..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Administration Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Global platform governance, multi-tenant organization directory, and security audit trail.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total System Users</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{metrics.users}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organizations Enrolled</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{metrics.orgs}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Audit Trail Records</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{metrics.logs}+ Events</h3>
          </div>
        </Card>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">User Directory</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Inspect users across all 10 roles, modify security statuses, or deactivate compromised accounts.
            </p>
          </div>
          <Link to="/dashboard/admin/users">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Manage Users
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Organizations</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Manage participating schools, NGOs, and corporate partners. Configure institutional codes.
            </p>
          </div>
          <Link to="/dashboard/admin/orgs">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Manage Organizations
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Compliance Audit Trail</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Verify cryptographic logs of authentication, status modifications, and sensitive evidence access.
            </p>
          </div>
          <Link to="/dashboard/admin/audit-logs">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Inspect Audit Trail
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
