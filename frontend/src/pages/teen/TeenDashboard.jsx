import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  BookOpen,
  Award,
  Sparkles,
  Smile,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

export const TeenDashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, modulesRes] = await Promise.all([
          apiClient.get('/teen/progress'),
          apiClient.get('/teen/modules'),
        ]);

        if (progressRes.success) setProgress(progressRes.data);
        if (modulesRes.success) setModules(modulesRes.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load teen dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading your safety dashboard..." />;
  }

  const completedCount = progress?.completed_modules || 0;
  const totalCount = progress?.total_modules || 5;
  const completionRate = progress?.completion_rate || Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 p-6 sm:p-8 text-white shadow-md shadow-teal-900/10">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="blue" className="bg-white/20 text-white border-white/30 mb-3">
            ✨ Student Safety Champion
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Hi, {user?.full_name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            You have completed <strong className="text-white font-bold">{completedCount} of {totalCount}</strong> core safety
            modules. Keep learning to stay digitally secure and earn your official certificate!
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard/teen/modules">
              <Button variant="secondary" size="sm" icon={BookOpen}>
                Continue Learning
              </Button>
            </Link>
            <Link to="/dashboard/teen/ai-chat">
              <Button variant="outline" size="sm" icon={Sparkles} className="text-white border-white/40 hover:bg-white/10">
                Ask AI Buddy
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Modules</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{completedCount} / {totalCount}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mastery Rate</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{completionRate}%</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mood Wellness</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">Active</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Certificates</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{completedCount > 0 ? '1 Ready' : 'In Progress'}</h3>
          </div>
        </Card>
      </div>

      {/* Safety Actions & Next Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Modules */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your Recommended Modules</h2>
            <Link to="/dashboard/teen/modules" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {modules.map((m) => (
              <Card key={m.id} hoverEffect className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="primary">{m.category.replace(/_/g, ' ')}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {m.reading_time_mins} mins read
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 truncate">{m.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{m.description}</p>
                </div>
                <Link to={`/dashboard/teen/modules/${m.id}`}>
                  <Button variant="outline" size="sm" icon={ArrowRight}>
                    Open Module
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Wellbeing & Safety Tools */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Safety Quick Tools</h2>

          <Card className="p-5 border-teal-200 bg-teal-50/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-teal-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-teal-950">AI Safety Companion</h4>
                <p className="text-xs text-teal-700">Safe, confidential peer guidance</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ask questions about cyberbullying, friendship stress, or online accounts with zero judgment.
            </p>
            <Link to="/dashboard/teen/ai-chat">
              <Button variant="primary" size="sm" className="w-full">
                Chat Anonymously
              </Button>
            </Link>
          </Card>

          <Card className="p-5 border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">AI Safety Videos</h4>
                <p className="text-xs text-emerald-700">Animated video lessons & quizzes</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Watch interactive AI video stories on personal boundaries, cyber safety, and legal rights.
            </p>
            <Link to="/dashboard/teen/ai-videos">
              <Button variant="primary" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Watch AI Videos
              </Button>
            </Link>
          </Card>

          <Card className="p-5 border-purple-200 bg-purple-50/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-purple-600 text-white">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">Daily Mood Check-in</h4>
                <p className="text-xs text-purple-700">How are you feeling today?</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Track your emotional wellness trends and reflect on your daily state of mind.
            </p>
            <Link to="/dashboard/teen/mood">
              <Button variant="secondary" size="sm" className="w-full">
                Log Today's Mood
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
