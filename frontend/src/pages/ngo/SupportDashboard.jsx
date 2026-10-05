import React, { useState, useEffect } from 'react';
import { HeartHandshake, FileText, Calendar, Plus, MessageSquare } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { TextareaField } from '../../components/forms/TextareaField';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useToast } from '../../hooks/useToast';

export const SupportDashboard = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCase, setActiveCase] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const { showToast } = useToast();

  const fetchCases = async () => {
    try {
      const res = await apiClient.get('/counselor/cases');
      if (res.success) {
        setCases(res.data);
      }
    } catch (err) {
      showToast('Failed to load support cases', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setSubmittingNote(true);
    try {
      const res = await apiClient.post('/counselor/notes', {
        complaint_id: activeCase.id,
        note_text: noteText.trim(),
        is_private: true,
      });

      if (res.success) {
        showToast('Confidential case note recorded', 'success');
        setActiveCase(null);
        setNoteText('');
        fetchCases();
      }
    } catch (err) {
      showToast(err.message || 'Failed to record note', 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading support and counselor hub..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Counseling & Child Welfare Support Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Confidential case intervention, victim advocacy, and mental wellness consultations.
        </p>
      </div>

      {cases.length === 0 ? (
        <EmptyState icon={HeartHandshake} title="No active referrals" description="There are no active support cases requiring intervention." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <Card key={c.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {c.tracking_code}
                  </span>
                  <Badge variant={c.severity === 'high' || c.severity === 'critical' ? 'danger' : 'neutral'}>
                    {c.category.replace(/_/g, ' ')}
                  </Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 leading-relaxed line-clamp-3">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {c.notes_count || 0} Case Notes Recorded
                </span>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setActiveCase(c)}>
                  Add Confidential Note
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Case Note Modal */}
      <Modal
        isOpen={!!activeCase}
        onClose={() => setActiveCase(null)}
        title={`Add Counselor Note for ${activeCase?.tracking_code}`}
      >
        <form onSubmit={handleAddNote} className="space-y-4">
          <TextareaField
            label="Confidential Clinical / Guidance Note"
            rows={5}
            placeholder="Record counseling observations, psycho-social evaluation, or recommended safeguards..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            required
            helperText="Stored under strict professional privilege. Never shared with outside parties."
          />

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setActiveCase(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submittingNote}>
              Save Note
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
