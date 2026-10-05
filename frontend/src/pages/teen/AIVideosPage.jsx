import React, { useState } from 'react';
import { Play, CheckCircle2, Sparkles, Clock, ShieldCheck, HelpCircle, Share2, Award, ArrowRight, X } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';

export const AIVideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'summary' | 'quiz'
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { showToast } = useToast();

  const videos = [
    {
      id: 'v-01',
      title: 'AI Guide: Safe Touch vs Unsafe Touch & Personal Boundaries',
      category: 'safe_touch_boundaries',
      duration: '4:15',
      thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80',
      description: 'An AI-animated story explaining body privacy, recognizing safe touch vs unsafe touch, and knowing when to say NO loudly.',
      summary: [
        'Your body belongs solely to you, and no one has the right to make you feel uncomfortable.',
        'Safe touch feels caring and respectful (like a high five or friendly handshake).',
        'Unsafe touch makes you feel scared, confused, or secret-bound.',
        'Always tell a trusted adult immediately if someone breaks your boundaries.'
      ],
      quiz: {
        question: 'What is the most important rule if someone makes an uncomfortable touch?',
        options: [
          'Keep it a secret to avoid getting them in trouble.',
          'Say NO firmly, run away to a safe spot, and tell a trusted adult immediately.',
          'Wait a few weeks before telling anyone.',
          'Assume it was just a mistake and ignore it.'
        ],
        correctIndex: 1,
        explanation: 'Hero choice! Never keep unsafe touches secret. Tell your trusted adult immediately.'
      }
    },
    {
      id: 'v-02',
      title: 'Cyberbullying Defense: How to Shield Yourself Online',
      category: 'cyber_safety',
      duration: '5:30',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: 'Learn step-by-step how to block online bullies, document digital evidence, and prevent social media harassment.',
      summary: [
        'Never reply to hateful or toxic comments — bullies feed on your reaction.',
        'Take full-screen screenshots showing timestamps and usernames before blocking.',
        'Use privacy settings to restrict direct messages to confirmed friends only.',
        'File a confidential report on TeenTalk if the perpetrator attends your school.'
      ],
      quiz: {
        question: 'What should you do before blocking a cyberbully?',
        options: [
          'Send a mean message back.',
          'Delete your entire account.',
          'Take screenshots with timestamps as evidence.',
          'Give them your password.'
        ],
        correctIndex: 2,
        explanation: 'Correct! Keeping evidence is essential for school administrators or legal action.'
      }
    },
    {
      id: 'v-03',
      title: 'Understanding POCSO Act 2012: Rights & Protections for Teenagers',
      category: 'posh_awareness',
      duration: '6:10',
      thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      description: 'A friendly AI breakdown of your legal rights under Indian Child Protection law (POCSO Act 2012) and zero-tolerance policies.',
      summary: [
        'POCSO Act protects every young person under age 18 regardless of gender.',
        'Victim identity is legally protected and must remain strictly confidential.',
        'Special Child Welfare Police Officers handle complaints with care and privacy.',
        'Childline 1098 is available 24/7 for free, confidential emergency rescue.'
      ],
      quiz: {
        question: 'Who is protected under the POCSO Act 2012?',
        options: [
          'Only adults above 18.',
          'All children and teens below age 18.',
          'Only college students.',
          'Only employees in offices.'
        ],
        correctIndex: 1,
        explanation: 'Spot on! POCSO guarantees legal safety for everyone under 18.'
      }
    },
    {
      id: 'v-04',
      title: 'Digital Footprint & AI Privacy: Securing Your Passwords & Photos',
      category: 'cyber_safety',
      duration: '4:45',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      description: 'How AI algorithms track data online, avoiding phishing scams, and keeping your personal photos offline.',
      summary: [
        'Once a photo is uploaded to the internet, you lose complete control over where it spreads.',
        'Never share login credentials, location tags, or OTP codes with gaming friends.',
        'Use Two-Factor Authentication (2FA) on every account.',
        'Verify unknown accounts before accepting friend requests.'
      ],
      quiz: {
        question: 'What is Two-Factor Authentication (2FA)?',
        options: [
          'Sharing your password with two friends.',
          'An extra security step like an app code or SMS confirmation when logging in.',
          'Using the same password twice.',
          'Writing your password on paper.'
        ],
        correctIndex: 1,
        explanation: 'Correct! 2FA keeps hackers out even if they figure out your password.'
      }
    },
    {
      id: 'v-05',
      title: 'Mindfulness & Overcoming Exam Anxiety: 5-Minute AI Guided Reset',
      category: 'emotional_wellbeing',
      duration: '3:50',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      description: 'A soothing guided video with grounding breathwork techniques and positive self-talk for high school stress.',
      summary: [
        'Box breathing (4s inhale, 4s hold, 4s exhale) calms the nervous system instantly.',
        'Your worth is not defined by a single exam score.',
        'Break studying into 25-minute Pomodoro sessions with physical stretching breaks.',
        'Talk to a counselor if anxiety interferes with your sleep or meals.'
      ],
      quiz: {
        question: 'What is the Box Breathing technique?',
        options: [
          'Breathing inside a cardboard box.',
          'Inhaling for 4s, holding for 4s, exhaling for 4s, holding for 4s.',
          'Holding your breath for 2 minutes.',
          'Breathing as fast as possible.'
        ],
        correctIndex: 1,
        explanation: 'Awesome! Box breathing lowers heart rate and restores mental clarity.'
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All AI Videos' },
    { id: 'safe_touch_boundaries', label: 'Personal Boundaries' },
    { id: 'cyber_safety', label: 'Cyber Safety' },
    { id: 'posh_awareness', label: 'POSCO & Rights' },
    { id: 'emotional_wellbeing', label: 'Mental Health' },
  ];

  const filteredVideos = videos.filter(
    (v) => selectedCategory === 'all' || v.category === selectedCategory
  );

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setActiveTab('player');
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    setQuizSubmitted(true);
    if (quizAnswer === selectedVideo.quiz.correctIndex) {
      setCompletedVideos((prev) => new Set(prev).add(selectedVideo.id));
      showToast('Correct answer! +50 AI Video Points Earned 🎉', 'success');
    } else {
      showToast('Review the video summary and try again!', 'warning');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <Badge variant="mint" className="bg-white/20 text-white border-white/30 mb-3">
            🎥 Interactive AI Safety Video Hub
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Learn Safety Through Animated AI Stories
          </h1>
          <p className="text-teal-50 text-xs sm:text-sm leading-relaxed mb-6">
            Watch short interactive AI lessons on cyber safety, personal boundaries, legal rights, and emotional wellbeing. Test your understanding to earn safety badges!
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              {completedVideos.size} / {videos.length} Videos Completed
            </span>
            <span className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-300" />
              {completedVideos.size * 50} Safety Pts
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isDone = completedVideos.has(video.id);
          return (
            <Card key={video.id} hoverEffect className="overflow-hidden flex flex-col justify-between p-0 border-slate-200">
              <div className="relative group cursor-pointer" onClick={() => handleOpenVideo(video)}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
                  {video.duration}
                </div>
                {isDone && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <Badge variant="primary" className="mb-2">
                    {video.category.replace(/_/g, ' ')}
                  </Badge>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {video.description}
                  </p>
                </div>

                <Button
                  variant={isDone ? 'outline' : 'primary'}
                  size="sm"
                  className="w-full"
                  onClick={() => handleOpenVideo(video)}
                  icon={Play}
                >
                  {isDone ? 'Replay AI Video' : 'Watch AI Lesson'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <Badge variant="mint" className="mb-1">AI Video Lesson</Badge>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {selectedVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tab Bar */}
            <div className="flex border-b border-slate-100 px-6 bg-slate-50">
              <button
                onClick={() => setActiveTab('player')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'player'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Play className="w-4 h-4" /> Video Player
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'summary'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" /> AI Takeaways
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 ${
                  activeTab === 'quiz'
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" /> Quick Check Quiz
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'player' && (
                <div className="space-y-4">
                  {/* Simulated Animated AI Video Canvas */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex flex-col justify-between p-4 shadow-inner">
                    <div className="flex items-center justify-between text-white text-xs z-10 bg-slate-900/60 p-2 rounded-xl backdrop-blur-xs">
                      <span className="font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" /> TeenTalk AI Studio HD
                      </span>
                      <span className="font-mono text-[11px]">{selectedVideo.duration}</span>
                    </div>

                    <div className="text-center my-auto text-white space-y-3 z-10 px-4">
                      <div className="w-16 h-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center mx-auto shadow-xl hover:scale-110 cursor-pointer transition-transform" onClick={() => setIsPlaying(!isPlaying)}>
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-sm font-semibold tracking-wide text-teal-200">
                        {isPlaying ? 'Playing AI Animated Video Lesson...' : 'Click Play to Begin Animated Story'}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 z-10">
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full rounded-full w-2/3 animate-pulse" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>02:15</span>
                        <span>{selectedVideo.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedVideo.description}
                  </p>

                  <div className="flex justify-end pt-2">
                    <Button variant="primary" size="sm" onClick={() => setActiveTab('summary')}>
                      View AI Key Takeaways <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                    <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600" /> Key Safety Takeaways from AI
                    </h3>
                    <ul className="space-y-2">
                      {selectedVideo.summary.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button variant="primary" size="sm" onClick={() => setActiveTab('quiz')}>
                      Take Quick Quiz to Claim Points <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">
                      {selectedVideo.quiz.question}
                    </h3>
                    <div className="space-y-2">
                      {selectedVideo.quiz.options.map((opt, i) => (
                        <label
                          key={i}
                          onClick={() => setQuizAnswer(i)}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-3 cursor-pointer transition-all ${
                            quizAnswer === i
                              ? 'bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-400'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quiz"
                            checked={quizAnswer === i}
                            onChange={() => setQuizAnswer(i)}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-4 rounded-xl border text-xs font-semibold ${
                        quizAnswer === selectedVideo.quiz.correctIndex
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      {selectedVideo.quiz.explanation}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedVideo(null)}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleQuizSubmit}
                      disabled={quizAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
