import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Heart, AlertCircle, FileText, CheckCircle2, Download, HelpCircle, PhoneCall, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';

export const AdultModulesPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('posh');
  const [quizScore, setQuizScore] = useState(null);
  const [answers, setAnswers] = useState({});
  const { showToast } = useToast();

  const adultTopics = [
    {
      id: 'posh',
      title: 'POSH Act 2013 & Workplace Safety',
      badge: 'Legal & HR Compliance',
      icon: ShieldCheck,
      color: 'teal',
      overview: 'Comprehensive guide to the Prevention of Sexual Harassment at Workplace (POSH) Act 2013, ICC guidelines, rights, and employer responsibilities.',
      sections: [
        {
          heading: '1. What is POSH Act 2013?',
          content: 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 is an Indian law passed to protect women from sexual harassment in their workplace. It applies to all offices, private companies, government bodies, hospitals, educational institutions, and NGOs.'
        },
        {
          heading: '2. Internal Complaints Committee (ICC)',
          content: 'Every organization with 10 or more employees must constitute an Internal Complaints Committee (ICC). The ICC must be headed by a senior woman employee, have at least 50% women members, and include an external independent member from an NGO or legal background.'
        },
        {
          heading: '3. Complaint & Inquiry Timeline',
          content: 'Complaints must be filed within 3 months of the incident. Conciliation is offered if requested by the aggrieved woman. Otherwise, the ICC completes the inquiry within 90 days and submits its report to the employer within 10 days of completion.'
        },
        {
          heading: '4. Rights & Protections',
          content: 'Strict confidentiality of victim identity, witnesses, and inquiry proceedings is mandatory. Employers are strictly barred from retaliating or transferring the complainant during inquiry.'
        }
      ]
    },
    {
      id: 'pocso',
      title: 'POCSO Act 2012 for Parents & Guardians',
      badge: 'Child Protection Law',
      icon: BookOpen,
      color: 'indigo',
      overview: 'Essential legal knowledge under Protection of Children from Sexual Offences (POCSO) Act 2012 for parents, teachers, and school administrators.',
      sections: [
        {
          heading: '1. Mandated Reporting (Section 19)',
          content: 'Under Section 19 of POCSO Act, any person (including parents, teachers, doctors, and neighbors) who has knowledge or suspicion of child abuse has a LEGAL DUTY to report the matter to Special Juvenile Police Unit or local police. Failure to report is a punishable offense.'
        },
        {
          heading: '2. Gender-Neutral Protection',
          content: 'POCSO protects ALL children under age 18 regardless of gender. The law recognizes sexual assault, harassment, and pornography offenses with stringent penalties.'
        },
        {
          heading: '3. Child-Friendly Reporting & Trial',
          content: 'Police officers must record statements in plain clothes, at the child\'s residence or a place of choice, in the presence of parents. Victims cannot be kept at police stations overnight.'
        },
        {
          heading: '4. Anonymity & Media Protection',
          content: 'Publishing the name, address, school, or image of a child involved in a POCSO case is strictly prohibited under law to prevent stigma and protect privacy.'
        }
      ]
    },
    {
      id: 'digital_parenting',
      title: 'Digital Parenting & Online Safety',
      badge: 'Family Safety',
      icon: Heart,
      color: 'purple',
      overview: 'Practical frameworks for managing screen time, recognizing online grooming, discussing social media safety, and setting digital boundaries without conflict.',
      sections: [
        {
          heading: '1. Open Communication vs Interrogation',
          content: 'Teens hide digital problems if they fear phone confiscation. Establish a "No Penalty Confession" rule — if your teen comes to you about an online mistake or threat, promise not to take away their device so they feel safe opening up.'
        },
        {
          heading: '2. Spotting Red Flags of Online Grooming',
          content: 'Watch out for sudden influx of expensive unapproved gifts/gaming credits, secretive screen switching, emotional withdrawal, or receiving packages from unknown online contacts.'
        },
        {
          heading: '3. Co-Creating Screen Contracts',
          content: 'Set household rules together: Device-free bedrooms after 9 PM, no phones at the dinner table, and mandatory Two-Factor Authentication on all social media accounts.'
        }
      ]
    },
    {
      id: 'mental_health',
      title: 'Adult Wellbeing & Supporting Anxious Teens',
      badge: 'Wellness & Care',
      icon: AlertCircle,
      color: 'rose',
      overview: 'Strategies to manage parent burnout, support adolescent mental health, and access verified counseling and crisis helplines.',
      sections: [
        {
          heading: '1. Managing Parent Burnout',
          content: 'Parenting adolescents requires emotional stamina. Prioritize self-care, set boundaries between work and home life, and seek peer support circles.'
        },
        {
          heading: '2. Distinguishing Normal Mood Swings vs Distress',
          content: 'Adolescent moodiness is normal due to hormonal shifts. However, persistent sadness lasting >2 weeks, abrupt drop in grades, loss of interest in hobbies, or self-harm marks require professional counseling.'
        },
        {
          heading: '3. Free 24/7 Support Resources',
          content: 'Call Tele-MANAS (14416) for free mental health counseling or Childline 1098 for immediate emergency assistance.'
        }
      ]
    }
  ];

  const adultQuiz = [
    {
      question: 'Within how many days must an ICC complete a POSH inquiry?',
      options: ['30 days', '60 days', '90 days', '120 days'],
      correct: 2
    },
    {
      question: 'Is reporting suspected child abuse under POCSO Act Section 19 mandatory?',
      options: [
        'Yes, it is a mandatory legal duty for all adults.',
        'No, it is optional depending on family permission.',
        'Only required for police officers.',
        'Only required if the child asks you to.'
      ],
      correct: 0
    },
    {
      question: 'What is the recommended approach if a teen confides about an online threat?',
      options: [
        'Immediately take away their smartphone forever.',
        'Listen calmly without threat of device confiscation, save evidence, and support them.',
        'Blame them for being on social media.',
        'Ignore it and hope it goes away.'
      ],
      correct: 1
    }
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    adultQuiz.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    setQuizScore(score);
    if (score === adultQuiz.length) {
      showToast('Perfect score! Adult Safety Knowledge verified 🎉', 'success');
    } else {
      showToast(`Scored ${score}/${adultQuiz.length}. Review the guides above!`, 'info');
    }
  };

  const currentTopic = adultTopics.find((t) => t.id === selectedTopic) || adultTopics[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <Badge variant="blue" className="bg-white/20 text-white border-white/30 mb-3">
            👨‍👩‍👧‍👦 Adult & Parent Knowledge Center
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Legal Frameworks, POSH/POCSO Guidelines & Digital Safety
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            Authorized safety modules for parents, guardians, educators, and working professionals. Master legal compliance, child protection laws, and positive parenting practices.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adultTopics.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedTopic === t.id;
          return (
            <Card
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`p-5 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500'
                  : 'border-slate-200 hover:border-indigo-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <Badge variant={isSelected ? 'primary' : 'neutral'}>{t.badge}</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{t.title}</h3>
            </Card>
          );
        })}
      </div>

      {/* Main Content Area */}
      <Card className="p-6 sm:p-8 space-y-6 border-slate-200 shadow-md">
        <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="primary" className="mb-1">{currentTopic.badge}</Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{currentTopic.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentTopic.overview}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTopic.sections.map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                {sec.heading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Adult Knowledge Assessment */}
      <Card className="p-6 sm:p-8 space-y-6 border-slate-200">
        <div>
          <Badge variant="mint" className="mb-1">Knowledge Verification</Badge>
          <h3 className="text-lg font-bold text-slate-900">Adult Safety & Legal Compliance Quiz</h3>
          <p className="text-xs text-slate-500">Test your understanding of POSH, POCSO, and digital safety rules.</p>
        </div>

        <div className="space-y-4">
          {adultQuiz.map((q, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="text-xs sm:text-sm font-bold text-slate-900">{idx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setAnswers({ ...answers, [idx]: oIdx })}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      answers[idx] === oIdx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          {quizScore !== null ? (
            <div className="text-xs font-bold text-indigo-900 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-200">
              Your Result: {quizScore} / {adultQuiz.length} Correct
            </div>
          ) : (
            <div />
          )}
          <Button variant="primary" onClick={handleQuizSubmit}>
            Verify Answers
          </Button>
        </div>
      </Card>
    </div>
  );
};
