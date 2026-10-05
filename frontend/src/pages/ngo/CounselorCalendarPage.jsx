import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

export const CounselorCalendarPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await apiClient.get('/counselor/calendar');
        if (res.success) {
          setSessions(res.data);
        }
      } catch (err) {
        console.error('Failed to load sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading counseling appointments..." />;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Counseling Schedule & Wellness Sessions
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Confidential student and employee wellbeing consultations.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <Card key={s.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="blue">{s.student_alias}</Badge>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {s.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.topic}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" /> {s.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teal-600" /> {s.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" /> {s.location}
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
              Session Ready
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};
