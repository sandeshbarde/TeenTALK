import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  FileText,
  Building,
} from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

export const EmployeeModuleDetailPage = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modRes, listRes] = await Promise.all([
          apiClient.get(`/teen/modules/${id}`),
          apiClient.get('/teen/modules?audience=employee'),
        ]);

        if (modRes.success) {
          setModuleData(modRes.data);
        }
        if (listRes.success) {
          setAllModules(listRes.data);
        }
      } catch (err) {
        showToast('Failed to load module details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, showToast]);

  const handleMarkComplete = async () => {
    setUpdating(true);
    try {
      const res = await apiClient.post('/teen/progress/update', {
        module_id: moduleData.id,
        status: 'completed',
        score: 100,
        time_spent_seconds: (moduleData.reading_time_mins || 8) * 60,
      });

      if (res.success) {
        showToast('Module marked as completed!', 'success');
        setModuleData((prev) => ({
          ...prev,
          progress: { ...prev.progress, status: 'completed', score: 100 },
        }));

        setAllModules((prev) =>
          prev.map((m) =>
            m.id === moduleData.id
              ? { ...m, progress: { ...m.progress, status: 'completed', score: 100 } }
              : m
          )
        );
      }
    } catch (err) {
      showToast(err.message || 'Failed to update progress', 'error');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Opening Employee POSH Module..." />;
  }

  if (!moduleData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-slate-800">Module not found</h2>
        <Link to="/dashboard/employee/learning" className="text-teal-600 underline text-sm mt-2 inline-block">
          Return to learning dashboard
        </Link>
      </div>
    );
  }

  const isCompleted = moduleData.progress?.status === 'completed';

  const currentIndex = allModules.findIndex((m) => m.id === moduleData.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex >= 0 && currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;
  const completedCount = allModules.filter((m) => m.progress?.status === 'completed').length;
  const allCompleted = completedCount >= 6 || (allModules.length > 0 && completedCount === allModules.length);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/dashboard/employee/learning"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Employee Curriculum
        </Link>

        <span className="text-xs font-semibold text-slate-400">
          Module {currentIndex >= 0 ? currentIndex + 1 : 1} of {allModules.length || 6}
        </span>
      </div>

      {/* Title Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="primary" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
            {moduleData.category.replace(/_/g, ' ')}
          </Badge>
          <span className="text-xs text-slate-300 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {moduleData.reading_time_mins || 8} mins reading time
          </span>
          {isCompleted && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {moduleData.title}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{moduleData.description}</p>
      </Card>

      {/* Relevant Image for Module 1 and 2 if available */}
      {moduleData.media_url && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-80 flex items-center justify-center bg-slate-100">
          <img
            src={moduleData.media_url}
            alt={moduleData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Module Content Article */}
      <Card className="p-6 sm:p-10 prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
        <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed font-sans">
          {moduleData.content}
        </div>
      </Card>

      {/* Status & Mark Complete Toolbar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Module Completion</h4>
          <p className="text-xs text-slate-500">
            {isCompleted
              ? 'This module has been recorded as complete toward your compliance certificate.'
              : 'Finished reviewing this module? Mark as complete to update your compliance record.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isCompleted ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleMarkComplete}
              isLoading={updating}
              icon={CheckCircle2}
              className="flex-1 sm:flex-initial"
            >
              Mark as Complete
            </Button>
          ) : (
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> Marked Complete
            </div>
          )}

          {allCompleted && (
            <Link to="/dashboard/employee/learning">
              <Button variant="primary" size="md" icon={Award} className="bg-teal-600 hover:bg-teal-700 text-white font-bold">
                Generate Certificate
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Previous / Next Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div>
          {prevModule ? (
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={() => navigate(`/dashboard/employee/learning/${prevModule.id}`)}
            >
              Previous Module
            </Button>
          ) : (
            <div />
          )}
        </div>

        <div>
          {nextModule ? (
            <Button
              variant="primary"
              size="sm"
              icon={ChevronRight}
              onClick={() => navigate(`/dashboard/employee/learning/${nextModule.id}`)}
            >
              Next Module
            </Button>
          ) : (
            <Link to="/dashboard/employee/documentation">
              <Button variant="primary" size="sm" icon={FileText} className="bg-teal-600 hover:bg-teal-700 text-white">
                View Documentation
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
