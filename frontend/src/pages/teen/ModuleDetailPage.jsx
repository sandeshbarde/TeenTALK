import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Award, HelpCircle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

export const ModuleDetailPage = () => {
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
          apiClient.get('/teen/modules?audience=teen'),
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
        time_spent_seconds: (moduleData.reading_time_mins || 6) * 60,
      });

      if (res.success) {
        showToast('Module marked as completed!', 'success');
        setModuleData((prev) => ({
          ...prev,
          progress: { ...prev.progress, status: 'completed', score: 100 },
        }));

        // Also update in allModules list
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
    return <LoadingSpinner message="Opening learning module..." />;
  }

  if (!moduleData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-slate-800">Module not found</h2>
        <Link to="/dashboard/teen/modules" className="text-teal-600 underline text-sm mt-2 inline-block">
          Return to modules
        </Link>
      </div>
    );
  }

  const isCompleted = moduleData.progress?.status === 'completed';

  // Navigation indices
  const currentIndex = allModules.findIndex((m) => m.id === moduleData.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex >= 0 && currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  // Completion calculation across curriculum
  const completedCount = allModules.filter((m) => m.progress?.status === 'completed').length;
  const allCompleted = completedCount >= 5 || (allModules.length > 0 && completedCount === allModules.length);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/dashboard/teen/modules"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all modules
        </Link>

        <span className="text-xs font-semibold text-slate-400">
          Module {currentIndex >= 0 ? currentIndex + 1 : 1} of {allModules.length || 5}
        </span>
      </div>

      {/* Module Title Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="primary">{moduleData.category.replace(/_/g, ' ')}</Badge>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {moduleData.reading_time_mins || 6} minutes learning time
          </span>
          {isCompleted && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          {moduleData.title}
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{moduleData.description}</p>
      </Card>

      {/* Media banner if available */}
      {moduleData.media_url && (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-72 flex items-center justify-center bg-slate-100">
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

      {/* Action / Completion Toolbar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Module Status</h4>
          <p className="text-xs text-slate-500">
            {isCompleted
              ? 'You have completed this module! Continue through the curriculum to qualify for the final assessment.'
              : 'Finished reading this module? Click below to record your progress.'}
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
            <Link to="/dashboard/teen/quizzes/c0000003-0000-0000-0000-000000000003">
              <Button variant="primary" size="md" icon={Award} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                Take Quiz
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Previous / Next Module Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div>
          {prevModule ? (
            <Button
              variant="outline"
              size="sm"
              icon={ChevronLeft}
              onClick={() => navigate(`/dashboard/teen/modules/${prevModule.id}`)}
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
              onClick={() => navigate(`/dashboard/teen/modules/${nextModule.id}`)}
            >
              Next Module
            </Button>
          ) : allCompleted ? (
            <Link to="/dashboard/teen/quizzes/c0000003-0000-0000-0000-000000000003">
              <Button variant="primary" size="sm" icon={Award} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                Proceed to Quiz
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard/teen/modules">
              <Button variant="outline" size="sm" icon={BookOpen}>
                Curriculum Overview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
