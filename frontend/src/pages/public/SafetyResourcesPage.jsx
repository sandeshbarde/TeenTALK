import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Scale,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Search,
  Lock,
  Heart,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';

const RESOURCES = [
  {
    id: 'res-1',
    category: 'Digital Safety',
    title: 'Teen Digital Footprint & Cyber Hygiene Checklist',
    description: 'A practical 10-step checklist to lock down Instagram, Snapchat, and WhatsApp against stalking and impersonation.',
    fileType: 'PDF Guide',
    pages: '4 Pages',
    tags: ['Cyber Safety', 'Privacy', 'Social Media'],
    badgeColor: 'bg-lavender-100 text-lavender-700',
  },
  {
    id: 'res-2',
    category: 'Legal Rights',
    title: 'POCSO Act 2012: Child & Teen Rights Handbook',
    description: 'Plain-language explanation of mandatory reporting, child welfare committees (CWC), and protective rights under Indian law.',
    fileType: 'Statutory Summary',
    pages: '6 Pages',
    tags: ['Legal', 'POCSO', 'Protection'],
    badgeColor: 'bg-warmrose-100 text-warmrose-700',
  },
  {
    id: 'res-3',
    category: 'Workplace & Campus',
    title: 'POSH Act 2013: Campus & Workplace Harassment Manual',
    description: 'Comprehensive guide to Internal Complaints Committees (ICC), inquiry timelines, and protection against retaliation.',
    fileType: 'Compliance Guide',
    pages: '8 Pages',
    tags: ['POSH', 'Workplace', 'ICC'],
    badgeColor: 'bg-trust-100 text-trust-700',
  },
  {
    id: 'res-4',
    category: 'Mental Health',
    title: 'Emotional First Aid & Stress Grounding Toolkit',
    description: 'Clinically vetted 5-4-3-2-1 grounding exercises, sleep hygiene routines, and panic recovery strategies for teens and young adults.',
    fileType: 'Wellness Worksheet',
    pages: '5 Pages',
    tags: ['Wellbeing', 'Grounding', 'Mental Health'],
    badgeColor: 'bg-mint-100 text-mint-700',
  },
  {
    id: 'res-5',
    category: 'Digital Safety',
    title: 'Recognizing Deepfakes & Non-Consensual Image Abuse',
    description: 'Immediate action steps to report, preserve evidence, and seek legal takedown of leaked or manipulated photos.',
    fileType: 'Action Protocol',
    pages: '3 Pages',
    tags: ['Cyber Crime', 'Evidence', 'IT Act'],
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'res-6',
    category: 'Workplace & Campus',
    title: 'First-Time Intern Safety & Professional Boundaries Guide',
    description: 'Empowering young women transitioning into offices, remote teams, and internships to recognize subtle red flags.',
    fileType: 'Pocket Guide',
    pages: '4 Pages',
    tags: ['Internships', 'Boundaries', 'Career'],
    badgeColor: 'bg-indigo-100 text-indigo-700',
  },
];

const LEGAL_FRAMEWORKS = [
  {
    title: 'POCSO Act (2012)',
    badge: 'Child & Minor Protection',
    summary: 'Guarantees child-friendly court procedures, mandatory anonymity of survivor identities, and strict punishment for offenses against individuals below 18.',
  },
  {
    title: 'POSH Act (2013)',
    badge: 'Workplace & Campus Dignity',
    summary: 'Mandates every organization with 10+ employees to constitute an Internal Committee (IC) with 50% women members and external NGO representation.',
  },
  {
    title: 'IT Act 2000 (Sec 66E, 67)',
    badge: 'Cyber Privacy & Anti-Voyeurism',
    summary: 'Criminalizes capturing, transmitting, or publishing private area images without consent, with up to 3 years imprisonment on first conviction.',
  },
  {
    title: 'DPDP Act (2023)',
    badge: 'Personal Data Protection',
    summary: 'Requires verifiable parental consent for children below 18 and prohibits targeted profiling or harmful tracking of minors.',
  },
];

export const SafetyResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  // Cyber hygiene mini-audit checklist state
  const [checks, setChecks] = useState({
    twoFa: false,
    privateAccount: true,
    locationOff: false,
    screenTimeLimit: true,
    noStrangerCalls: false,
  });

  const toggleCheck = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedChecksCount = Object.values(checks).filter(Boolean).length;
  const auditScore = Math.round((completedChecksCount / Object.keys(checks).length) * 100);

  const categories = ['All', 'Digital Safety', 'Legal Rights', 'Workplace & Campus', 'Mental Health'];

  const filteredResources = RESOURCES.filter(res => {
    const matchesCat = activeCategory === 'All' || res.category === activeCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleDownload = (title) => {
    showToast(`Downloading: "${title}" (Verified PDF)`, 'success');
  };

  return (
    <div className="space-y-14 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="mint">Open Educational Knowledge Base</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Safety Resources & Legal Toolkits
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Free, peer-reviewed safety guides, statutory rights summaries, and interactive self-audits designed to keep you informed and secure.
        </p>
      </div>

      {/* Interactive Cyber Security Quick Audit Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-lavender-50/80 via-white to-mint-50/80 border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-2 lg:col-span-1">
            <Badge variant="primary">Interactive Self-Check</Badge>
            <h3 className="text-xl font-bold text-slate-900">Your Privacy Shield Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check off the safety habits you currently follow on your smartphone and social apps to calculate your protection strength.
            </p>
            <div className="pt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-lavender-800">{auditScore}%</span>
                <span className="text-xs font-semibold text-slate-500">Protected</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-lavender-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${auditScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'twoFa', label: '2-Factor Authentication enabled on Instagram & Email' },
              { key: 'privateAccount', label: 'Social media profile is set to Private / Friends only' },
              { key: 'locationOff', label: 'Precise GPS location sharing disabled for camera apps' },
              { key: 'screenTimeLimit', label: 'Healthy daily screen-time limits & bedtime silence active' },
              { key: 'noStrangerCalls', label: 'Auto-block calls and DMs from unknown non-contacts' },
            ].map(({ key, label }) => (
              <div
                key={key}
                onClick={() => toggleCheck(key)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  checks[key]
                    ? 'border-mint-500 bg-mint-50/80 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <span className="text-xs font-medium">{label}</span>
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ml-2 ${
                    checks[key] ? 'bg-mint-600 border-mint-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {checks[key] && <CheckCircle className="w-3.5 h-3.5" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides or topics..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 bg-white"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <Card key={res.id} className="p-6 flex flex-col justify-between border-slate-200 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${res.badgeColor}`}>
                    {res.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{res.pages}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">{res.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {res.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">{res.fileType}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(res.title)}
                  className="gap-1.5 text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Statutory Legal Frameworks */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="primary">Legal Safeguards</Badge>
          <h2 className="text-2xl font-bold text-slate-900">Statutory Protection Frameworks</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Crucial legislation protecting children, young adults, and women across Indian schools, colleges, and workplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {LEGAL_FRAMEWORKS.map((item, idx) => (
            <Card key={idx} className="p-6 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-lavender-600" />
                  {item.title}
                </h4>
                <Badge variant="neutral">{item.badge}</Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
