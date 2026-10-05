import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Plus, History, Calendar } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { TextareaField } from '../../components/forms/TextareaField';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { MoodLineChart } from '../../components/charts/AnalyticsCharts';
import { useToast } from '../../hooks/useToast';

export const MoodTrackerPage = () => {
  const [moodRating, setMoodRating] = useState(4);
  const [selectedEmotions, setSelectedEmotions] = useState(['Optimistic']);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const emotionTags = [
    'Calm',
    'Optimistic',
    'Grateful',
    'Focused',
    'Anxious',
    'Tired',
    'Overwhelmed',
    'Irritated',
    'Sad',
    'Lonely',
    'Excited',
  ];

  const moodLevels = [
    { rating: 1, label: 'Very Low', emoji: '😞', color: 'hover:bg-rose-50' },
    { rating: 2, label: 'Low', emoji: '😕', color: 'hover:bg-amber-50' },
    { rating: 3, label: 'Neutral', emoji: '😐', color: 'hover:bg-slate-100' },
    { rating: 4, label: 'Good', emoji: '🙂', color: 'hover:bg-teal-50' },
    { rating: 5, label: 'Great', emoji: '😄', color: 'hover:bg-emerald-50' },
  ];

  const fetchHistory = async () => {
    try {
      const res = await apiClient.get('/mentalhealth/mood-history');
      if (res.success && res.data) {
        setHistory(res.data.history || []);
      }
    } catch (err) {
      console.error('Failed to load mood history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleEmotion = (tag) => {
    setSelectedEmotions((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await apiClient.post('/mentalhealth/mood-log', {
        mood_rating: moodRating,
        emotions: selectedEmotions,
        note: note.trim(),
      });

      if (res.success) {
        showToast('Daily mood entry saved! Keep up your reflection.', 'success');
        setNote('');
        fetchHistory();
      }
    } catch (err) {
      showToast(err.message || 'Failed to record mood', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Opening emotional wellness tracker..." />;
  }

  const chartData = history
    .slice(0, 10)
    .reverse()
    .map((item) => ({
      date: new Date(item.logged_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      rating: item.mood_rating,
    }));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Emotional Wellness & Mood Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          A confidential space to reflect on how you feel, identify emotional patterns, and practice mindful care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Check-In Form */}
        <Card className="lg:col-span-2 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">How are you feeling right now?</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Selector */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {moodLevels.map((m) => (
                <button
                  key={m.rating}
                  type="button"
                  onClick={() => setMoodRating(m.rating)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                    moodRating === m.rating
                      ? 'border-teal-500 bg-teal-50/80 ring-2 ring-teal-500/20 scale-105'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className="text-[11px] font-bold text-slate-700">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Emotions tags */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                What emotions describe your day?
              </label>
              <div className="flex flex-wrap gap-2">
                {emotionTags.map((tag) => {
                  const isSelected = selectedEmotions.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleEmotion(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reflective Note */}
            <TextareaField
              label="Reflective Journaling (Private)"
              rows={3}
              placeholder="What went well today? What caused you stress or happiness?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              helperText="Only you can view your personal journal reflections."
            />

            <Button type="submit" variant="primary" size="md" className="w-full" isLoading={submitting}>
              Save Mood Entry
            </Button>
          </form>
        </Card>

        {/* Weekly Trend Chart */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-1">Your Wellbeing Trend</h3>
            <p className="text-xs text-slate-400 mb-4">Rating history (1: Low - 5: Great)</p>
            {chartData.length > 0 ? (
              <MoodLineChart data={chartData} />
            ) : (
              <p className="text-xs text-slate-400 text-center py-10">Log at least two entries to see trends.</p>
            )}
          </Card>
        </div>
      </div>

      {/* History List */}
      <Card className="p-6">
        <CardHeader title="Recent Mood Reflections" subtitle="Your historical wellness logs" />
        {history.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">No mood entries recorded yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {history.map((h) => (
              <div key={h.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {moodLevels.find((m) => m.rating === h.mood_rating)?.emoji || '😐'}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Rating: {h.mood_rating}/5
                    </span>
                    <span className="text-xs text-slate-400">
                      • {new Date(h.logged_at).toLocaleDateString()} at {new Date(h.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {h.note && <p className="text-xs text-slate-600 mt-1 italic">"{h.note}"</p>}
                </div>

                <div className="flex flex-wrap gap-1">
                  {h.emotions?.map((e) => (
                    <span key={e} className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-md font-semibold border border-teal-200">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
