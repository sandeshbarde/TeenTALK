import React, { useState, useEffect } from 'react';
import { History, Search, ShieldCheck } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';

export const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiClient.get('/admin/audit-logs?limit=50');
        if (res.success) {
          setLogs(res.data);
        }
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.actor_name && l.actor_name.toLowerCase().includes(search.toLowerCase())) ||
      l.resource_type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Retrieving immutable audit trail..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Security & Compliance Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-evident logs of system actions, role access grants, complaint submissions, and evidence reviews.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search action or actor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={History} title="No audit events found" />
      ) : (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">Actor</th>
                  <th className="py-3.5 px-6">Action</th>
                  <th className="py-3.5 px-6">Resource</th>
                  <th className="py-3.5 px-6">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 text-slate-500 font-mono text-[11px]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-800">
                      <div>{log.actor_name || 'System'}</div>
                      {log.actor_email && (
                        <div className="text-[10px] text-slate-400 font-mono">{log.actor_email}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <Badge variant={log.action.includes('CRISIS') ? 'danger' : 'neutral'}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-mono text-[11px]">
                      {log.resource_type} {log.resource_id ? `#${log.resource_id.substring(0, 8)}` : ''}
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 font-mono text-[11px]">
                      {log.ip_address}
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
