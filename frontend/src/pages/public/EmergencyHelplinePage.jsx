import React from 'react';
import { PhoneCall, ShieldAlert, HeartHandshake, ExternalLink } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { CRISIS_NUMBERS } from '../../constants';

export const EmergencyHelplinePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Emergency Helplines & Crisis Directory
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Free, confidential, 24/7 national support lines. If you are in immediate danger, please reach out to emergency
          services without hesitation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {CRISIS_NUMBERS.map((c) => (
          <Card key={c.number} className="border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  24/7 Free
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">{c.desc}</p>
            </div>
            <a
              href={`tel:${c.number.split('/')[0].trim()}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-teal-400" />
              Call {c.number}
            </a>
          </Card>
        ))}
      </div>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 text-amber-900 text-sm">
        <h4 className="font-bold mb-1 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-amber-600" />
          When should you reach out?
        </h4>
        <ul className="list-disc list-inside text-xs space-y-1 mt-2 text-amber-800">
          <li>If someone online is threatening you, extorting you, or demanding personal pictures.</li>
          <li>If you are facing continuous bullying, abuse, or violence at school, home, or work.</li>
          <li>If you are feeling overwhelmed, having thoughts of self-harm, or severe depression.</li>
          <li>You are never alone. Professional counselors will listen with zero judgment.</li>
        </ul>
      </div>
    </div>
  );
};
