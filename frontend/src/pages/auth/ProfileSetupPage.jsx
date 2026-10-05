import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  Heart,
  BookOpen,
  Users,
  Check,
  ArrowRight,
  User,
  Bell,
  EyeOff,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const AVATAR_OPTIONS = [
  { id: 'avatar-1', emoji: '🌸', label: 'Cherry Bloom', color: 'bg-warmrose-100 text-warmrose-700 border-warmrose-300' },
  { id: 'avatar-2', emoji: '✨', label: 'Starlight', color: 'bg-lavender-100 text-lavender-700 border-lavender-300' },
  { id: 'avatar-3', emoji: '🌿', label: 'Mint Leaf', color: 'bg-mint-100 text-mint-700 border-mint-300' },
  { id: 'avatar-4', emoji: '🌊', label: 'Ocean Calm', color: 'bg-trust-100 text-trust-700 border-trust-300' },
  { id: 'avatar-5', emoji: '🦉', label: 'Wise Owl', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { id: 'avatar-6', emoji: '🛡️', label: 'Guardian', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
];

const AGE_GROUPS = [
  { id: '10-13', label: '10–13', name: 'Young Learner', desc: 'Body safety, friendly guidance & trusted adults' },
  { id: '14-17', label: '14–17', name: 'Teen', desc: 'Cyber safety, digital privacy & boundaries' },
  { id: '18-25', label: '18–25', name: 'Young Adult', desc: 'Campus independence & workplace rights' },
  { id: '26-40', label: '26–40', name: 'Adult & Parent', desc: 'Family digital guidance & professional safety' },
  { id: '41-50', label: '41–50', name: "Women's Support", desc: 'Life transitions, wellness & advocacy' },
];

const TOPIC_OPTIONS = [
  { id: 'cyber', label: 'Cyber Safety & Social Media' },
  { id: 'wellness', label: 'Emotional Wellbeing & Stress' },
  { id: 'boundaries', label: 'Consent & Personal Boundaries' },
  { id: 'posh', label: 'Workplace & Campus Safety (POSH)' },
  { id: 'legal', label: 'Legal Rights & Helplines' },
  { id: 'relationships', label: 'Healthy Friendships & Peer Support' },
];

export const ProfileSetupPage = () => {
  const { user, updateUser, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState(user?.age_group || '14-17');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar_url || 'avatar-2');
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [selectedTopics, setSelectedTopics] = useState(['cyber', 'wellness', 'boundaries']);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const toggleTopic = (id) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics(selectedTopics.filter(t => t !== id));
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      if (user && updateUser) {
        await updateUser({
          full_name: fullName || user.full_name,
          age_group: ageGroup,
          avatar_url: selectedAvatar,
          preferences: {
            topics: selectedTopics,
            is_anonymous: isAnonymous,
            notifications: notifications,
          },
        });
        const targetRoute = getDashboardRoute(user.role);
        navigate(targetRoute);
      } else {
        // Guest customization: store preference in local storage
        localStorage.setItem('teentalk_guest_pref', JSON.stringify({ ageGroup, selectedAvatar, selectedTopics }));
        navigate('/modules');
      }
    } catch (err) {
      console.error('Failed to save profile setup:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 bg-slate-50/60 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step === num
                      ? 'bg-lavender-700 text-white shadow-md'
                      : step > num
                      ? 'bg-mint-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {step > num ? <Check className="w-4 h-4" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-14 sm:w-20 h-1 mx-2 rounded ${
                      step > num ? 'bg-mint-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mt-3">
            {step === 1 && 'Step 1: Choose Your Learning Experience'}
            {step === 2 && 'Step 2: Profile & Privacy Shield'}
            {step === 3 && 'Step 3: Select Your Focus Areas'}
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-md border-slate-200/80">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Select Your Age Experience
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  TeenTalk customizes language, scenarios, and safety resources to meet you exactly where you are.
                </p>
              </div>

              <div className="space-y-3">
                {AGE_GROUPS.map((g) => {
                  const isSelected = ageGroup === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setAgeGroup(g.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-lavender-600 bg-lavender-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{g.name}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                            {g.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{g.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-lavender-700 bg-lavender-700 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={() => setStep(2)}>
                  Continue to Profile <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Your Avatar & Display Name
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  We care about your privacy. You can use an avatar and nickname instead of personal photos.
                </p>
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                  Pick a Calm Trust Avatar
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {AVATAR_OPTIONS.map((av) => {
                    const isSelected = selectedAvatar === av.id;
                    return (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatar(av.id)}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                          av.color
                        } ${
                          isSelected
                            ? 'ring-2 ring-offset-2 ring-lavender-600 scale-105 shadow-md'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <span className="text-3xl mb-1">{av.emoji}</span>
                        <span className="text-[11px] font-semibold">{av.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Display Name / Nickname
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya or CuriousStar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-lavender-500 text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This is how certificates and friendly greetings will address you.
                </p>
              </div>

              {/* Privacy Toggles */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Anonymous Mode</p>
                      <p className="text-[11px] text-slate-500">Hide full name on all school cohort tables</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-lavender-600 rounded border-slate-300 focus:ring-lavender-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Gentle Reminders</p>
                      <p className="text-[11px] text-slate-500">Encouraging notifications for weekly safety lessons</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="w-4 h-4 text-lavender-600 rounded border-slate-300 focus:ring-lavender-500"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)}>
                  Choose Topics <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  What Topics Interest You Most?
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Pick topics you’d like highlighted first on your personal dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TOPIC_OPTIONS.map((topic) => {
                  const isChecked = selectedTopics.includes(topic.id);
                  return (
                    <div
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-lavender-500 bg-lavender-50/70 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold">{topic.label}</span>
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${
                          isChecked
                            ? 'bg-lavender-700 border-lavender-700 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-mint-50 border border-mint-200 flex items-start gap-3">
                <Shield className="w-5 h-5 text-mint-700 mt-0.5 shrink-0" />
                <p className="text-xs text-mint-900">
                  <strong>You’re all set!</strong> All TeenTalk learning is self-paced, confidential, and verified by certified child & adult safety educators.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleFinish}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Finish Setup'} <Sparkles className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
