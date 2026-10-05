import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  Award,
  PhoneCall,
  ArrowRight,
  BookOpen,
  Heart,
  Users,
  CheckCircle,
  Building,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CRISIS_NUMBERS } from '../../constants';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 24/7 Emergency Alert Bar */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-inner">
        <PhoneCall className="w-4 h-4 animate-bounce" />
        <span>In crisis or immediate danger? Call National Childline 1098 or Emergency 112 (Toll-Free, 24/7)</span>
        <Link to="/helpline" className="underline font-bold ml-1 hover:text-rose-100">
          View All Helplines →
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-teal-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Verified Teen Safety & Institutional Redressal
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Empowering Adolescents with <span className="text-teal-600">Knowledge</span>,{' '}
              <span className="text-blue-600">Safety</span> & <span className="text-purple-600">Support</span>.
            </h1>
            <p className="text-base sm:text-xl text-slate-600 mb-8 leading-relaxed font-normal">
              A comprehensive platform uniting students, schools, parents, and counselors to prevent cyberbullying,
              teach personal boundaries, and provide confidential POSH redressal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                  Start Safety Learning Free
                </Button>
              </Link>
              <Link to="/file-complaint">
                <Button variant="outline" size="lg" icon={Lock} className="w-full sm:w-auto">
                  File Confidential Report
                </Button>
              </Link>
            </div>

            {/* Credibility badges */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-teal-600">100%</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Anonymous Option</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">10 Roles</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Multi-Tiered RBAC</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-600">24/7</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">AI Safety Guidance</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">POSH</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">Statutory Redressal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars (Team Module Integration) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-2">Integrated Platform</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed for Real-World School & Workplace Safety
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1: Payal */}
            <Card hoverEffect className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Teen Safety Curriculum</h4>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Interactive modules covering cyber safety, 2FA protection, personal body boundaries, and upstander
                strategies.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-700">
                Lead: Payal Sharma
              </div>
            </Card>

            {/* Pillar 2: Tejas */}
            <Card hoverEffect className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">School & Admin Oversight</h4>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Comprehensive analytics dashboards for school principals, tracking student participation and curriculum
                completion.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-700">
                Lead: Tejas Kulkarni
              </div>
            </Card>

            {/* Pillar 3: Nisha */}
            <Card hoverEffect className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">POSH & Confidential Reports</h4>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                End-to-end confidential reporting with anonymous tracking codes, encrypted evidence uploader, and HR case
                workflows.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-700">
                Lead: Nisha Verma
              </div>
            </Card>

            {/* Pillar 4: Harshada */}
            <Card hoverEffect className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">AI Safety, Mood & Quizzes</h4>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Crisis-aware educational AI chat companion, daily mood journaling, interactive quizzes, and verifiable
                certificates.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-purple-700">
                Lead: Harshada Patil
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Hotlines Strip */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Immediate Emergency Contacts</h3>
              <p className="text-xs text-slate-400 mt-1">
                If you or a friend is experiencing distress, abuse, or violence, free verified assistance is one call
                away.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {CRISIS_NUMBERS.slice(0, 3).map((c) => (
                <div key={c.number} className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-300 block">{c.name}</span>
                  <span className="text-base font-bold text-teal-400">{c.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
