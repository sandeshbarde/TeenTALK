import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  BookOpen,
  Briefcase,
  Users,
  ArrowRight,
  HelpCircle,
  KeyRound,
  Check,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const WelcomeExperiencePage = () => {
  const [selectedExperience, setSelectedExperience] = useState('teen');
  const navigate = useNavigate();

  const experiences = [
    {
      id: 'young',
      ageLabel: 'Age 10–13',
      title: 'Young Learner',
      tagline: 'Body safety, friendly guidance & trusted adults',
      desc: 'Simple lessons, fun illustrations, and learning to say NO to unsafe situations.',
      icon: Heart,
      accent: 'border-warmrose-200 bg-warmrose-50/50 hover:border-warmrose-400 text-warmrose-900',
      badge: 'bg-warmrose-100 text-warmrose-700',
      targetRole: 'teen',
      targetAge: '10-13',
    },
    {
      id: 'teen',
      ageLabel: 'Age 14–17',
      title: 'Teen',
      tagline: 'Cyber safety, digital privacy & boundaries',
      desc: 'Protect your accounts, handle peer pressure, interactive stories & AI safety buddy.',
      icon: Sparkles,
      accent: 'border-lavender-200 bg-lavender-50/50 hover:border-lavender-400 text-lavender-900',
      badge: 'bg-lavender-100 text-lavender-700',
      targetRole: 'teen',
      targetAge: '14-17',
    },
    {
      id: 'young_adult',
      ageLabel: 'Age 18–25',
      title: 'Young Adult',
      tagline: 'Campus independence & workplace rights',
      desc: 'Navigating relationships, POSH awareness for internships, and mental wellness.',
      icon: BookOpen,
      accent: 'border-trust-200 bg-trust-50/50 hover:border-trust-400 text-trust-900',
      badge: 'bg-trust-100 text-trust-700',
      targetRole: 'employee',
      targetAge: '18-25',
    },
    {
      id: 'adult',
      ageLabel: 'Age 26–40',
      title: 'Adult & Parent',
      tagline: 'Parenting cyber protection & workplace safety',
      desc: 'Guiding adolescents in digital spaces, POSH rights, and family wellbeing.',
      icon: Users,
      accent: 'border-mint-200 bg-mint-50/50 hover:border-mint-400 text-mint-900',
      badge: 'bg-mint-100 text-mint-700',
      targetRole: 'adult',
      targetAge: '26-40',
    },
    {
      id: 'women_support',
      ageLabel: 'Age 41–50',
      title: "Women's Support",
      tagline: 'Lifelong learning, legal rights & community care',
      desc: 'Calm, accessible wellness guides, support services, and community mentorship.',
      icon: ShieldCheck,
      accent: 'border-teal-200 bg-teal-50/50 hover:border-teal-400 text-teal-900',
      badge: 'bg-teal-100 text-teal-700',
      targetRole: 'adult',
      targetAge: '41-50',
    },
    {
      id: 'org',
      ageLabel: 'Institutional',
      title: 'Employee / Organization',
      tagline: 'School administration, HR & statutory POSH',
      desc: 'Manage student curriculum, investigate complaints, and review audit trails.',
      icon: Briefcase,
      accent: 'border-slate-300 bg-slate-50/70 hover:border-slate-500 text-slate-900',
      badge: 'bg-slate-200 text-slate-800',
      targetRole: 'school_admin',
      targetAge: 'org',
    },
  ];

  const handleContinue = () => {
    const selected = experiences.find((e) => e.id === selectedExperience);
    navigate(`/register?role=${selected.targetRole}&age=${selected.targetAge}`);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-lavender-50/60 via-white to-slate-50">
      <div className="max-w-4xl w-full">
        {/* Brand identity header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-lavender-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-lavender-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome to <span className="text-lavender-700">Teen</span><span className="text-teal-600">Talk</span>
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-600 mt-2">
            "Your safety. Your confidence. Your journey."
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Select your age group or role to personalize your learning topics, language, and support tools.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            const isSelected = selectedExperience === exp.id;

            return (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'border-lavender-600 bg-white ring-4 ring-lavender-500/15 shadow-md scale-[1.02]'
                    : `${exp.accent} border-opacity-70 shadow-xs hover:shadow-sm`
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-lavender-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${exp.badge}`}>
                      {exp.ageLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-xl bg-white shadow-2xs text-lavender-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mb-1">{exp.tagline}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{exp.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-lavender-700 flex items-center gap-1">
                  Tailored experience <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <Card className="p-6 bg-white border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Ready to explore TeenTalk with your customized experience?</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
            <Button variant="primary" size="md" onClick={handleContinue} icon={ArrowRight} className="w-full sm:w-auto bg-lavender-700 hover:bg-lavender-800">
              Continue with Selection
            </Button>
            <Link to="/login">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                Log In
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Links Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <Link to="/login" className="hover:text-slate-900 transition-colors">
            Already have an account? Log in
          </Link>
          <span>•</span>
          <Link to="/register" className="hover:text-slate-900 transition-colors">
            Create general account
          </Link>
          <span>•</span>
          <Link to="/forgot-password" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-slate-400" />
            Forgot password?
          </Link>
          <span>•</span>
          <Link to="/helpline" className="text-warmrose-600 font-bold hover:underline flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Immediate Help
          </Link>
        </div>
      </div>
    </div>
  );
};
