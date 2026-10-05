import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { ScoreBarChart } from '../../components/charts/AnalyticsCharts';

export const SchoolDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get('/school/analytics');
        if (res.success) {
          setAnalytics(res.data);
        }
      } catch (err) {
        console.error('Failed to load school analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Calculating school safety metrics..." />;
  }

  const chartData = analytics?.module_breakdown?.map((m) => ({
    title: m.title.length > 20 ? m.title.substring(0, 18) + '...' : m.title,
    completions: m.completions,
  })) || [];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Safety Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time student safety participation, curriculum adoption, and compliance metrics.
          </p>
        </div>
        <Link to="/dashboard/school/students">
          <Button variant="primary" size="sm" icon={Users}>
            View Student Roster
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrolled Students</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{analytics?.total_enrolled_students || 0}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Module Completions</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{analytics?.total_module_completions || 0}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Certificates Awarded</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{analytics?.total_certificates_awarded || 0}</h3>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reported Incidents</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{analytics?.reported_incidents_count || 0}</h3>
          </div>
        </Card>
      </div>

      {/* Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <CardHeader
            title="Curriculum Engagement by Topic"
            subtitle="Number of students who have completed each safety module"
          />
          <ScoreBarChart data={chartData} />
        </Card>

        {/* Quick Management Box */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Curriculum Deployment</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Ensure grade-level alignment for statutory anti-bullying, POSH intern training, and cyber hygiene.
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Cyber Safety & 2FA</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Personal Boundaries</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Anti-Bullying Upstander</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <Link to="/dashboard/school/students">
              <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                Inspect Full Student Roster
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
