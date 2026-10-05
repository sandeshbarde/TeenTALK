import React from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { ShieldCheck, Code, Users, Database, HeartHandshake } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          About TeenTalk Project
        </h1>
        <p className="text-slate-600 leading-relaxed text-base">
          TeenTalk is an academic full-stack engineering initiative created to bridge the gap between digital safety
          education, institutional POSH compliance, and adolescent mental health support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader title="System Architecture" subtitle="Modular Multi-Tiered Design" />
          <p className="text-sm text-slate-600 leading-relaxed">
            The platform is built on React 18, Vite, and Tailwind CSS on the frontend, with a RESTful Express/Node.js
            backend backed by Supabase PostgreSQL with strict Row Level Security (RLS) policies and JWT authentication.
          </p>
        </Card>

        <Card>
          <CardHeader title="Role-Based Security" subtitle="10 Distinct Roles" />
          <p className="text-sm text-slate-600 leading-relaxed">
            Every layer enforces fine-grained authorization across Teen, Adult, Employee, School Admin, HR, NGO,
            Counselor, Content Manager, Super Admin, and Auditor roles with dedicated dashboards and organization-scoping.
          </p>
        </Card>
      </div>

      <div className="border-t border-slate-200 pt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Team Ownership & Contributions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-teal-700 mb-1">Payal Sharma</h3>
            <p className="text-xs text-slate-500 font-semibold mb-3">Module Lead</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authentication, public pages, UI layout system, and teen safety learning modules.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-blue-700 mb-1">Tejas Kulkarni</h3>
            <p className="text-xs text-slate-500 font-semibold mb-3">Module Lead</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Database schema, Supabase RLS, School Admin console, and Super Admin user/organization management.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-rose-700 mb-1">Nisha Verma</h3>
            <p className="text-xs text-slate-500 font-semibold mb-3">Module Lead</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confidential complaint filing, encrypted evidence storage, HR POSH cases, and counselor notes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-purple-700 mb-1">Harshada Patil</h3>
            <p className="text-xs text-slate-500 font-semibold mb-3">Module Lead</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adult guidance portal, crisis-aware AI chat companion, mood journaling, interactive quizzes, and certificates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
