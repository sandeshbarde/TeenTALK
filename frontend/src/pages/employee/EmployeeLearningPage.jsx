import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, Search, ArrowRight, ShieldCheck, FileText, Award, Check } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useToast } from '../../hooks/useToast';

export const EmployeeLearningPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [generatingCert, setGeneratingCert] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await apiClient.get('/teen/modules?audience=employee');
        if (res.success) {
          setModules(res.data);
        }
      } catch (err) {
        console.error('Failed to load employee modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const completedCount = modules.filter((m) => m.progress?.status === 'completed').length;
  const totalCount = modules.length || 6;
  const allCompleted = completedCount >= 6;

  const handleGenerateCertificate = async () => {
    setGeneratingCert(true);
    try {
      const res = await apiClient.post('/certificate/employee-program');
      if (res.success && res.data) {
        showToast('Workplace Safety & POSH Certificate generated!', 'success');
        navigate(`/dashboard/teen/certificates/${res.data.id || res.data.certificate_code}`);
      }
    } catch (err) {
      showToast(err.message || 'Failed to generate certificate', 'error');
    } finally {
      setGeneratingCert(false);
    }
  };

  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading Employee POSH Learning Curriculum..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full mb-3 border border-teal-700/50">
            <ShieldCheck className="w-3.5 h-3.5" /> Employee Learning Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Workplace Safety & POSH Awareness Program
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Flow: <strong>Learning Modules → Documentation → Completion → Certificate</strong>.
            Review all 6 modules and institutional documentation to receive your accredited POSH certificate (no quiz required).
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/dashboard/employee/documentation">
              <Button variant="outline" size="sm" icon={FileText} className="text-white border-slate-600 hover:bg-slate-800">
                View Documentation & Resources
              </Button>
            </Link>
          </div>
        </div>

        {/* Completion & Certificate Trigger Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col justify-between text-center min-w-[240px]">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold block mb-1">
              Curriculum Progress
            </span>
            <div className="text-3xl font-black text-white">
              {completedCount} / {totalCount}
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              {allCompleted ? 'All modules completed!' : `${totalCount - completedCount} module(s) remaining`}
            </p>
          </div>

          <div className="mt-4">
            {allCompleted ? (
              <Button
                variant="primary"
                onClick={handleGenerateCertificate}
                isLoading={generatingCert}
                className="w-full shadow-lg bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold"
                icon={Award}
              >
                Generate Certificate
              </Button>
            ) : (
              <Button variant="outline" disabled className="w-full text-white/50 border-white/20 cursor-not-allowed text-xs">
                Complete 6/6 to Earn Certificate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Notification Banner if 6/6 */}
      {allCompleted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              ✅ All employee learning modules completed successfully.
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateCertificate}
            isLoading={generatingCert}
            icon={Award}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0"
          >
            Generate Certificate
          </Button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-slate-900">Mandatory Modules</h2>
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <EmptyState title="No modules found" description="Try clearing your search query." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((m, index) => {
            const isCompleted = m.progress?.status === 'completed';
            const moduleNumber = m.module_number || index + 1;

            return (
              <Card key={m.id} hoverEffect className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      Module {moduleNumber}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{m.title}</h3>
                  <div className="mb-2">
                    <Badge variant="primary">{m.category.replace(/_/g, ' ')}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{m.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {m.reading_time_mins || 8} mins
                  </span>

                  <Link to={`/dashboard/employee/learning/${m.id}`}>
                    <Button variant={isCompleted ? 'outline' : 'primary'} size="sm" icon={ArrowRight}>
                      {isCompleted ? 'Review' : 'Start Learning'}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
