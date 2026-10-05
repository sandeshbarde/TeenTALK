import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FilePlus,
  History,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  FileText,
  Award,
} from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

export const EmployeeDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [modules, setModules] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, modRes, certRes] = await Promise.all([
          apiClient.get('/complaints/my').catch(() => ({ success: false, data: [] })),
          apiClient.get('/teen/modules?audience=employee').catch(() => ({ success: false, data: [] })),
          apiClient.get('/certificate/my').catch(() => ({ success: false, data: [] })),
        ]);

        if (compRes.success) setComplaints(compRes.data);
        if (modRes.success) setModules(modRes.data);
        if (certRes.success) setCertificates(certRes.data);
      } catch (err) {
        console.error('Failed to load employee portal data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading workplace safety portal..." />;
  }

  const completedCount = modules.filter((m) => m.progress?.status === 'completed').length;
  const totalModules = modules.length || 6;
  const allCompleted = completedCount >= 6;
  const hasCertificate = certificates.some((c) => c.program_type === 'employee');

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Welcome banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <Badge variant="primary" className="bg-teal-500/20 text-teal-300 border-teal-500/30 mb-3">
            ⚖️ POSH Workplace Protection & Compliance
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Employee & Intern Safety Portal
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            You have the fundamental right to a safe, respectful, and harassment-free workplace. You can complete
            mandatory POSH learning, review statutory documentation, or submit confidential complaints with complete privacy.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/file-complaint">
              <Button variant="primary" size="sm" icon={FilePlus}>
                File Confidential Report
              </Button>
            </Link>
            <Link to="/track-complaint">
              <Button variant="outline" size="sm" icon={History} className="text-white border-slate-600 hover:bg-slate-800">
                Track by Case Code
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* LEARNING PROGRESS SECTION */}
      <Card className="p-6 sm:p-8 border-teal-200 bg-gradient-to-br from-white to-teal-50/20 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Learning Progress</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Mandatory POSH training and statutory rights curriculum. Review all 6 modules and documentation to earn your institutional compliance certification.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Modules Completed</span>
                <p className="text-base font-extrabold text-slate-900">
                  {completedCount} / {totalModules} Modules Completed
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Documentation</span>
                <p className="text-base font-extrabold text-teal-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Available
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Certificate Status</span>
                <p className="text-base font-extrabold text-slate-800">
                  {hasCertificate
                    ? 'Earned'
                    : allCompleted
                    ? 'Available to Generate'
                    : 'Complete All Modules'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <Link to="/dashboard/employee/learning">
              <Button variant="primary" size="sm" icon={BookOpen} className="w-full justify-center">
                Continue Learning
              </Button>
            </Link>
            <Link to="/dashboard/employee/documentation">
              <Button variant="outline" size="sm" icon={FileText} className="w-full justify-center">
                View Documentation
              </Button>
            </Link>
            {hasCertificate || allCompleted ? (
              <Link to={hasCertificate ? "/dashboard/employee/certificates" : "/dashboard/employee/learning"}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Award}
                  className="w-full justify-center text-teal-700 border-teal-300 hover:bg-teal-50"
                >
                  {hasCertificate ? 'View Certificate' : 'Generate Certificate'}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </Card>

      {/* POSH Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">Confidential & Impartial</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All complaints are investigated strictly by an Internal Committee (IC) adhering to statutory POSH
            guidelines and timelines.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">Protected Evidence Storage</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Uploaded screenshots, emails, and call logs are securely encrypted and never exposed to unauthorized
            parties or public URLs.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">Non-Retaliation Policy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Strict institutional safeguards protect complainants and witnesses against any form of employment or
            grade retaliation.
          </p>
        </Card>
      </div>

      {/* My Submitted Complaints */}
      <Card className="p-6">
        <CardHeader
          title="My Filed Inquiries"
          subtitle="Non-anonymous complaints submitted from your verified account"
          action={
            <Link to="/file-complaint">
              <Button variant="outline" size="sm" icon={FilePlus}>
                New Incident
              </Button>
            </Link>
          }
        />

        {complaints.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            You have not submitted any non-anonymous complaints from this account.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {complaints.map((c) => (
              <div key={c.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                      {c.tracking_code}
                    </span>
                    <Badge variant={c.severity === 'critical' || c.severity === 'high' ? 'danger' : 'neutral'}>
                      {c.category.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reported on {new Date(c.created_at).toLocaleDateString()} • {c.evidence_count} evidence attached
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="primary">{c.status.replace(/_/g, ' ')}</Badge>
                  <Link to={`/track-complaint?code=${c.tracking_code}`}>
                    <Button variant="ghost" size="sm" icon={ArrowRight}>
                      View Status
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
