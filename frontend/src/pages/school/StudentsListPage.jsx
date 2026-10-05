import React, { useState, useEffect } from 'react';
import { Users, Search, Award, BookOpen, ShieldCheck } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';

export const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await apiClient.get('/school/students');
        if (res.success) {
          setStudents(res.data);
        }
      } catch (err) {
        console.error('Failed to load students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Retrieving student enrollment roster..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Enrolled Students Roster
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track individual progress across statutory safety modules and credential achievements.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students found"
          description="Try modifying your search term or invite students to register using your school code."
        />
      ) : (
        <Card className="p-0 overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Student Name</th>
                  <th className="py-3.5 px-6">Email Address</th>
                  <th className="py-3.5 px-6 text-center">Modules Completed</th>
                  <th className="py-3.5 px-6 text-center">Certificates</th>
                  <th className="py-3.5 px-6">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs shrink-0">
                        {s.full_name.charAt(0)}
                      </div>
                      <span>{s.full_name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">{s.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full">
                        {s.completed_modules}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {s.certificates_earned > 0 ? (
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          {s.certificates_earned} Earned
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(s.created_at).toLocaleDateString()}
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
