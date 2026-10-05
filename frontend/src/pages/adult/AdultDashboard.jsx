import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, BookOpen, AlertCircle, PhoneCall, Sparkles, MessageCircle, ArrowRight, FileText, Users, Award } from 'lucide-react';
import { Card, CardHeader } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CRISIS_NUMBERS } from '../../constants';

export const AdultDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <Badge variant="blue" className="bg-white/20 text-white border-white/30 mb-3">
            👨‍👩‍👧‍👦 Adult, Parent & Professional Guidance Hub
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Supporting Adolescent Safety & Legal Compliance
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            Access verified guides on the POSH Act 2013, POCSO Act 2012 child protection laws, non-judgmental digital parenting, and adult wellbeing resources.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard/adult/modules">
              <Button variant="secondary" size="sm" icon={BookOpen}>
                Explore Adult Safety & POSH/POCSO Modules
              </Button>
            </Link>
            <Link to="/modules">
              <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/10" icon={Users}>
                Browse Teen Curriculum Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Modules & Legal Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverEffect className="p-6 flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <Badge variant="primary" className="mb-2">POSH Act 2013</Badge>
            <h3 className="text-base font-bold text-slate-900 mb-1">Workplace Anti-Harassment</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Internal Complaints Committee (ICC) duties, 90-day inquiry timelines, and mandatory workplace policies.
            </p>
          </div>
          <Link to="/dashboard/adult/modules">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Read POSH Guide
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <Badge variant="blue" className="mb-2">POCSO Act 2012</Badge>
            <h3 className="text-base font-bold text-slate-900 mb-1">Child Protection Rights</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Section 19 mandatory reporting rules for parents & educators, child-friendly trial procedures, & victim privacy.
            </p>
          </div>
          <Link to="/dashboard/adult/modules">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Read POCSO Guide
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <Badge variant="neutral" className="mb-2">Digital Parenting</Badge>
            <h3 className="text-base font-bold text-slate-900 mb-1">Screen Limits & Grooming</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Co-creating household screen contracts, recognizing online red flags, and non-punitive open dialogue.
            </p>
          </div>
          <Link to="/dashboard/adult/modules">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Digital Safety Rules
            </Button>
          </Link>
        </Card>

        <Card hoverEffect className="p-6 flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <Badge variant="mint" className="mb-2">Parent Wellbeing</Badge>
            <h3 className="text-base font-bold text-slate-900 mb-1">Mental Health & Care</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Managing parent burnout, distinguishing normal moodiness from depression, and verified counseling lines.
            </p>
          </div>
          <Link to="/dashboard/adult/modules">
            <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
              Parent Mental Health
            </Button>
          </Link>
        </Card>
      </div>

      {/* Core Guidance Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect className="p-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Recognizing Cyberbullying</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Signs include sudden withdrawal from social activities, closing screens when parents walk into the room,
            or changes in sleep patterns. Avoid threatening to confiscate devices, as this prevents teens from opening up.
          </p>
        </Card>

        <Card hoverEffect className="p-6">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Non-Judgmental Conversations</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Practice active listening. Ask questions like: "How are things with your friend group online lately?" rather
            than interrogative inquiries. Validate their emotions before offering solutions.
          </p>
        </Card>

        <Card hoverEffect className="p-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Setting Healthy Digital Boundaries</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Co-create screen time contracts together. Establish device-free zones like the dinner table and bedrooms
            during sleep hours to support restorative sleep.
          </p>
        </Card>
      </div>

      {/* Emergency Helpline Strip */}
      <Card className="p-6 border-slate-200">
        <CardHeader
          title="Verified Crisis Lines for Parents & Educators"
          subtitle="If your teen is experiencing severe psychological crisis or immediate danger"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CRISIS_NUMBERS.slice(0, 3).map((item) => (
            <div key={item.number} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-700">{item.name}</span>
              <span className="text-lg font-extrabold text-teal-600 block my-1">{item.number}</span>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
