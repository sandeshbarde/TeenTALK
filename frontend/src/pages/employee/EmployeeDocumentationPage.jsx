import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Shield,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const EmployeeDocumentationPage = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showICModal, setShowICModal] = useState(false);

  const docs = [
    {
      id: 'doc-1',
      title: 'Workplace Harassment Awareness',
      relatedModule: 'Workplace Harassment: Know Your Rights',
      moduleId: 'emp-mod-01',
      summary: 'Statutory definition of harassment, protected classes, and legal safeguards for every employee and intern.',
      fullContent: `WORKPLACE HARASSMENT AWARENESS & LEGAL RIGHTS

1. Legal Definition:
Under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act), workplace harassment encompasses any unwelcome act or behavior of a sexual nature—whether direct or implied.

2. Scope of Workplace:
The "workplace" is not restricted to the physical office desk. It extends to:
- Official transportation and commutes provided by the employer.
- Company-sponsored events, dinners, and offsite conferences.
- Digital communication channels (Slack, Teams, WhatsApp, Zoom, email).
- Client sites and vendor locations visited during business engagements.

3. Protected Rights:
- Right to a safe working environment free from hostile intimidation.
- Right to confidential complaint filing with the Internal Committee (IC).
- Guaranteed protection against retaliation, termination, or grading bias during and after inquiry.`,
    },
    {
      id: 'doc-2',
      title: 'POSH Act Employee Guide',
      relatedModule: 'POSH Act: A Simple Guide for Employees',
      moduleId: 'emp-mod-02',
      summary: 'Comprehensive overview of employer mandates, employee rights, inquiry timelines, and redressal mechanisms.',
      fullContent: `POSH ACT: COMPREHENSIVE EMPLOYEE GUIDE

1. Core Objectives:
The POSH Act aims to prevent sexual harassment, provide prompt redressal, and prohibit hostile work environments across all Indian organizations employing 10 or more people.

2. Quid Pro Quo vs. Hostile Work Environment:
- Quid Pro Quo: Explicit or implicit promise of preferential treatment or threat of detrimental employment decisions in exchange for sexual favors.
- Hostile Work Environment: Creation of an intimidating, hostile, or offensive work climate through derogatory remarks, offensive imagery, or persistent intrusion.

3. Statutory Inquiry Timelines:
- Complaint Submission: Within 3 months from the date of the incident (extendable by 3 months by IC upon reasonable cause).
- Completion of Inquiry: Must be concluded within 90 days of receipt.
- Report Submission: IC must submit the inquiry report within 10 days of completion to the employer.
- Implementation: Employer must implement recommendations within 60 days.`,
    },
    {
      id: 'doc-3',
      title: 'Recognizing Sexual Harassment',
      relatedModule: 'Recognizing Sexual Harassment at Work',
      moduleId: 'emp-mod-03',
      summary: 'Practical taxonomy to distinguish between welcome interpersonal rapport, benign banter, and harassment.',
      fullContent: `RECOGNIZING SEXUAL HARASSMENT AT WORK

1. Behavioral Indicators:
Harassment is determined by the IMPACT on the recipient, NOT the intention of the perpetrator.

2. Key Categories of Unwelcome Conduct:
- Verbal: Unwelcome sexual advances, suggestive comments about clothing or anatomy, persistent prying into intimate personal life.
- Non-Verbal: Suggestive staring, leering, blocking physical pathways, displaying sexually explicit memes, posters, or stickers.
- Physical: Unwelcome touching, brushing against someone, hugging without consent, cornering.

3. Consent & Boundaries:
- A polite smile or nervous chuckle does NOT constitute consent.
- Prior consensual friendship or dating does not waive current or future boundary violations.
- When in doubt: Professional decorum and mutual respect must always govern workplace conduct.`,
    },
    {
      id: 'doc-4',
      title: 'Digital Workplace Safety',
      relatedModule: 'Digital Harassment & Workplace Communication',
      moduleId: 'emp-mod-04',
      summary: 'Ground rules for corporate email, instant messaging apps, video conferencing, and off-hours communication.',
      fullContent: `DIGITAL WORKPLACE SAFETY & COMMUNICATION PROTOCOLS

1. The Digital Workspace:
All official communication platforms—including Google Meet, Microsoft Teams, Slack, email, and designated WhatsApp groups—are legally part of the employer's workplace.

2. Prohibited Digital Conduct:
- Sending unsolicited flirtatious or sexually suggestive text messages, audio notes, or emojis (e.g., hearts, winking faces) outside professional context.
- Persistent off-hours personal messaging after being politely told to stop.
- Capturing screenshots of colleagues during video meetings without consent.
- Cyberstalking colleagues across Instagram, LinkedIn, or personal social media.

3. Best Practices:
- Restrict work communications to established business hours and authorized enterprise channels.
- Maintain professional tone and language in all written interactions.
- Always preserve digital trails (screenshots with timestamps, email headers) if misconduct occurs.`,
    },
  ];

  const icMembers = [
    {
      name: 'Dr. Sunita Rao (Presiding Officer)',
      email: 'posh.presiding@teentalk.org',
      phone: '+91 98200 11223',
      office: 'Room 304, Building A, Central Campus',
      hours: 'Mon - Fri: 10:00 AM - 5:00 PM',
    },
    {
      name: 'Advocate Rajesh Mehta (External Member)',
      email: 'rajesh.posh@legalcounsel.in',
      phone: '+91 98200 44556',
      office: 'Legal Aid Chambers, 2nd Floor, Mumbai',
      hours: 'Tue & Thu: 2:00 PM - 6:00 PM',
    },
    {
      name: 'Nisha Kulkarni (Employee Representative)',
      email: 'nisha.hr@teentalk.org',
      phone: '+91 98200 77889',
      office: 'HR Operations, Room 102, Building B',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-16">
      {/* Title */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full mb-3">
          <FileText className="w-3.5 h-3.5" /> Compliance Resources
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Employee Learning Documentation
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Access important workplace safety, POSH awareness, reporting and employee-support information.
        </p>
      </div>

      {/* Grid of Documentation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 to 4: Resource Documentation */}
        {docs.map((doc) => (
          <Card key={doc.id} hoverEffect className="p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Related to: {doc.relatedModule}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{doc.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {doc.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                icon={FileText}
                onClick={() => setSelectedDoc(doc)}
              >
                View Documentation
              </Button>
              <Link to={`/dashboard/employee/learning/${doc.moduleId}`}>
                <span className="text-xs font-semibold text-teal-700 hover:underline">
                  Module →
                </span>
              </Link>
            </div>
          </Card>
        ))}

        {/* Card 5: Internal Committee (IC) Information */}
        <Card hoverEffect className="p-6 flex flex-col justify-between border-teal-200 bg-teal-50/30">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
              Related to: Internal Committee (IC): Who Can You Approach?
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Internal Committee Information
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Direct contact coordinates, working hours, and physical office locations for certified IC Presiding Officers and External legal members.
            </p>

            <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-teal-100">
              <p className="font-bold text-slate-900">Dr. Sunita Rao (Presiding Officer)</p>
              <p className="text-[11px] text-slate-500">posh.presiding@teentalk.org</p>
              <p className="text-[11px] text-slate-500">Building A, Central Campus</p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-teal-100">
            <Button
              variant="primary"
              size="sm"
              icon={Building}
              className="w-full justify-center bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => setShowICModal(true)}
            >
              View IC Details
            </Button>
          </div>
        </Card>

        {/* Card 6: Reporting Workplace Harassment */}
        <Card hoverEffect className="p-6 flex flex-col justify-between border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Related to: How to Report Workplace Harassment
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Reporting Workplace Harassment
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Step-by-step statutory protocol for safely recording and submitting confidential harassment complaints.
            </p>

            {/* Compact summary of flow */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
              <div>1. Something feels wrong</div>
              <div className="text-teal-600 font-bold">↓ Ensure personal safety</div>
              <div>... 6-stage structured inquiry</div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link to="/file-complaint">
              <Button variant="primary" size="sm" icon={Shield}>
                File Report Now
              </Button>
            </Link>
            <Link to="/dashboard/employee/learning/emp-mod-06">
              <span className="text-xs font-semibold text-teal-700 hover:underline">
                Read Guide →
              </span>
            </Link>
          </div>
        </Card>
      </div>

      {/* FULL REPORTING WORKPLACE HARASSMENT FLOWCHART */}
      <Card className="p-6 sm:p-10 border-slate-200 shadow-sm space-y-6">
        <div>
          <Badge variant="primary" className="mb-2">Statutory Process</Badge>
          <h2 className="text-xl font-bold text-slate-900">
            Reporting Workplace Harassment: Official Flowchart
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Follow this clear step-by-step pathway whenever you experience or witness inappropriate workplace conduct.
          </p>
        </div>

        {/* Flowchart visual cards */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <div className="w-full md:flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto mb-2">1</span>
            <h4 className="text-xs font-bold text-slate-900">Something feels wrong</h4>
            <p className="text-[11px] text-slate-500 mt-1">Trust your instincts if behavior makes you uncomfortable</p>
          </div>

          <ArrowDown className="md:hidden w-4 h-4 text-slate-400 shrink-0" />
          <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 shrink-0" />

          <div className="w-full md:flex-1 p-4 rounded-2xl bg-teal-50 border border-teal-200">
            <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">2</span>
            <h4 className="text-xs font-bold text-teal-900">Ensure personal safety</h4>
            <p className="text-[11px] text-teal-700 mt-1">Remove yourself from danger and establish boundaries</p>
          </div>

          <ArrowDown className="md:hidden w-4 h-4 text-slate-400 shrink-0" />
          <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 shrink-0" />

          <div className="w-full md:flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto mb-2">3</span>
            <h4 className="text-xs font-bold text-slate-900">Document the incident</h4>
            <p className="text-[11px] text-slate-500 mt-1">Save screenshots, messages, timestamps, and witness names</p>
          </div>

          <ArrowDown className="md:hidden w-4 h-4 text-slate-400 shrink-0" />
          <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 shrink-0" />

          <div className="w-full md:flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto mb-2">4</span>
            <h4 className="text-xs font-bold text-slate-900">Approach IC / HR</h4>
            <p className="text-[11px] text-slate-500 mt-1">Reach out confidentially to discuss formal or conciliation options</p>
          </div>

          <ArrowDown className="md:hidden w-4 h-4 text-slate-400 shrink-0" />
          <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 shrink-0" />

          <div className="w-full md:flex-1 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center mx-auto mb-2">5</span>
            <h4 className="text-xs font-bold text-slate-900">File written complaint</h4>
            <p className="text-[11px] text-slate-500 mt-1">Submit online through portal or in writing within 90 days</p>
          </div>

          <ArrowDown className="md:hidden w-4 h-4 text-slate-400 shrink-0" />
          <ChevronRight className="hidden md:block w-5 h-5 text-slate-400 shrink-0" />

          <div className="w-full md:flex-1 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">6</span>
            <h4 className="text-xs font-bold text-emerald-900">IC inquiry & resolution</h4>
            <p className="text-[11px] text-emerald-700 mt-1">Impartial 90-day investigation and binding recommendations</p>
          </div>
        </div>
      </Card>

      {/* MODAL: View Full Documentation Article */}
      {selectedDoc && (
        <Modal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc.title}
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
              <strong>Module Reference:</strong> {selectedDoc.relatedModule}
            </div>
            <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {selectedDoc.fullContent}
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <Link to={`/dashboard/employee/learning/${selectedDoc.moduleId}`}>
                <Button variant="primary" size="sm" icon={BookOpen}>
                  Open Full Interactive Module
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: View Internal Committee Details */}
      {showICModal && (
        <Modal
          isOpen={showICModal}
          onClose={() => setShowICModal(false)}
          title="Internal Committee (IC) Official Directory"
        >
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <p className="text-xs text-slate-600 leading-relaxed">
              The Internal Committee is constituted under Section 4 of the POSH Act, 2013. You can reach out directly to any member listed below:
            </p>

            <div className="space-y-3">
              {icMembers.map((member, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-teal-600" /> {member.email}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-600" /> {member.phone}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" /> {member.office}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" /> {member.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              <strong>Confidentiality Guarantee:</strong> Communications with the Internal Committee are legally sealed under Section 16 of the POSH Act and cannot be published or leaked under RTI or public forums.
            </div>

            <div className="pt-2 text-right">
              <Button variant="primary" size="sm" onClick={() => setShowICModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
