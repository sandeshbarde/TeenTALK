import React from 'react';
import { ShieldCheck, BookOpen, AlertOctagon, Scale, Award, Users } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="primary">Platform Standards & Code of Conduct</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          TeenTalk Terms of Service
        </h1>
        <p className="text-sm text-slate-600">
          Last Updated: September 2026 • Governing Safe Usage & Educational Integrity
        </p>
      </div>

      <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-lavender-600" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TeenTalk ("the Platform"), whether as a learner, parent, school administrator, counselor, or employee, you agree to comply with these Terms of Service. If you do not agree, please do not use the Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-warmrose-600" /> 2. Community Code of Conduct & Zero-Harassment Policy
          </h2>
          <p>
            TeenTalk is a protective space designed specifically for vulnerable age groups and individuals seeking safety. You agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li>Never bully, intimidate, harass, or impersonate another user.</li>
            <li>Never attempt to deanonymize peers or complainants using tracking codes.</li>
            <li>Never upload malicious files, deepfakes, or non-consensual explicit content.</li>
            <li>Use the reporting channel only for genuine safety concerns and not for malicious or fraudulent claims.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-trust-600" /> 3. Educational Purpose vs. Emergency Medical/Legal Advice
          </h2>
          <p>
            TeenTalk provides safety education, awareness modules, and triage workflows. While our content is developed alongside legal and psychological experts, <strong>the Platform does not replace immediate emergency intervention, formal psychiatric diagnosis, or court representation</strong>. If you are in physical danger, immediately dial national emergency <strong>112</strong> or childline <strong>1098</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-mint-600" /> 4. Certificates & Verification Hashes
          </h2>
          <p>
            Upon scoring 70% or higher on safety module assessments, learners receive a digitally verifiable certificate. Certificates include cryptographic SHA-256 signatures. Any attempt to forge, alter, or falsify safety credentials is a violation of these terms and may result in institutional reporting.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-600" /> 5. Institutional Organization Accounts
          </h2>
          <p>
            Schools, universities, and workplace organizations utilizing TeenTalk must designate verified administrators and POSH committee representatives. Institutional users agree to handle all student and employee incident reports in accordance with statutory POCSO/POSH confidentiality mandates.
          </p>
        </section>
      </div>
    </div>
  );
};
