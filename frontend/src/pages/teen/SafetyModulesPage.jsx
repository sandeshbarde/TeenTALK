import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, Search, ArrowRight, ShieldCheck, Award, HelpCircle } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';

export const SafetyModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await apiClient.get('/teen/modules?audience=teen');
        if (res.success) {
          setModules(res.data);
        }
      } catch (err) {
        console.error('Failed to load modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'self_discovery', label: 'Self Discovery' },
    { id: 'consent_boundaries', label: 'Consent & Boundaries' },
    { id: 'adolescence', label: 'Adolescence & Puberty' },
    { id: 'health_hygiene', label: 'Health & Hygiene' },
    { id: 'decision_making', label: 'Decision Making' },
  ];

  const filteredModules = modules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const completedCount = modules.filter((m) => m.progress?.status === 'completed').length;
  const totalCount = modules.length || 5;
  const allCompleted = completedCount >= 5;

  if (loading) {
    return <LoadingSpinner message="Loading Teen Learning Curriculum..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-teal-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-200 bg-teal-700/40 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Teen Learning Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Teen Learning & Awareness Program
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Flow: <strong>Learning Modules → Module Content → Quiz → Result → Certificate</strong>.
            Complete all 5 modules below to unlock the final Teen Learning Assessment.
          </p>
        </div>

        {/* Learning Assessment Status / Action */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-center min-w-[220px]">
          <div>
            <span className="text-xs uppercase tracking-wider text-teal-200 font-semibold block mb-1">
              Curriculum Progress
            </span>
            <div className="text-2xl font-black text-white">
              {completedCount} / {totalCount}
            </div>
            <p className="text-[11px] text-teal-200 mt-1">
              {allCompleted ? 'All modules completed!' : `${totalCount - completedCount} remaining to unlock quiz`}
            </p>
          </div>

          <div className="mt-4">
            {allCompleted ? (
              <Link to="/dashboard/teen/quizzes/c0000003-0000-0000-0000-000000000003">
                <Button variant="primary" className="w-full shadow-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold" icon={Award}>
                  Take Final Quiz
                </Button>
              </Link>
            ) : (
              <Button variant="outline" disabled className="w-full text-white/50 border-white/20 cursor-not-allowed text-xs">
                Complete All to Take Quiz
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === c.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
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

      {/* Module Grid */}
      {filteredModules.length === 0 ? (
        <EmptyState
          title="No modules match your query"
          description="Try selecting another category or changing your search keywords."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((m, index) => {
            const isCompleted = m.progress?.status === 'completed';
            const moduleNumber = m.module_number || index + 1;

            return (
              <Card key={m.id} hoverEffect className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      Module {moduleNumber}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Not Started
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
                    <Clock className="w-3.5 h-3.5" /> {m.reading_time_mins || 6} mins
                  </span>

                  <Link to={`/dashboard/teen/modules/${m.id}`}>
                    <Button variant={isCompleted ? 'outline' : 'primary'} size="sm" icon={ArrowRight}>
                      {isCompleted ? 'Review Module' : 'Start Learning'}
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
