import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Award,
  BookOpen,
  User,
  Heart,
  ChevronRight,
  Volume2,
  VolumeX,
  MessageCircle,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { useToast } from '../../context/ToastContext';

export const StoryPlayerPage = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [safetyScore, setSafetyScore] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { showToast } = useToast();

  const storyverse = [
    {
      id: 'story-01',
      title: 'Maya & The Secret Gaming Group',
      theme: 'Digital Privacy & Grooming',
      character: 'Maya, age 13',
      characterAvatar: '👧',
      background: 'bg-gradient-to-r from-purple-600 to-indigo-700',
      description: 'Maya loves her crafting game. When an older high-tier player offers free gems in exchange for private photos, Maya faces a tough choice.',
      scenes: [
        {
          id: 'scene-1',
          heading: 'Scene 1: The Unexpected Gift Offer',
          narrative: 'Maya is playing her favorite multiplayer craft game. A user named "GamerSam" sends a friend request with 5,000 free gems and says: "Hey Maya! You are a super builder. Join my private server link and send a quick photo in your school uniform so I know you are real."',
          choices: [
            {
              id: 'A',
              text: 'Send the photo because rare gems are hard to get and it is just a school uniform.',
              feedback: '⚠️ Unsafe Choice! Never send photos or reveal your school uniform to online contacts. Impostors use fake profiles to track teens.',
              is_safe: false,
              nextScene: 1,
            },
            {
              id: 'B',
              text: 'Refuse firmly, take a screenshot, block GamerSam, and tell Mom or Dad immediately.',
              feedback: '🛡️ Hero Choice! You protected your personal privacy and alerted your trusted adult circle immediately.',
              is_safe: true,
              nextScene: 1,
            },
            {
              id: 'C',
              text: 'Ask GamerSam to send their photo first before deciding.',
              feedback: '⚡ Risky Choice! Online predators frequently use stolen images from Google to trick teenagers.',
              is_safe: false,
              nextScene: 1,
            },
          ],
        },
        {
          id: 'scene-2',
          heading: 'Scene 2: The Discord Pressure',
          narrative: 'GamerSam sends a follow-up message: "If you don\'t send it in 10 minutes, I will tell everyone on the server you are a fake player!" Maya feels anxious.',
          choices: [
            {
              id: 'A',
              text: 'Panic and delete the app without telling anyone.',
              feedback: '⚠️ Hiding in fear leaves the threat unresolved. Telling an adult helps report the predatory account.',
              is_safe: false,
              nextScene: 2,
            },
            {
              id: 'B',
              text: 'Remember that blackmail is NEVER your fault. Show the screenshot to a parent or counselor and report the user to the game admin.',
              feedback: '🌟 Outstanding courage! Reporting blackmails stops predators from harming you and other players.',
              is_safe: true,
              nextScene: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'story-02',
      title: 'Rohan & The Exam Pressure Spiral',
      theme: 'Mental Health & Peer Support',
      character: 'Rohan, age 15',
      characterAvatar: '👦',
      background: 'bg-gradient-to-r from-blue-600 to-teal-700',
      description: 'With board exams approaching, Rohan is skipping meals and sleeping only 3 hours a night. His friend Kabir notices the red flags.',
      scenes: [
        {
          id: 'scene-1',
          heading: 'Scene 1: The Midnight Study Panic',
          narrative: 'Rohan hasn\'t slept in 48 hours and is experiencing severe chest tightness before his math exam. He considers taking unknown energy pills recommended on a chat forum.',
          choices: [
            {
              id: 'A',
              text: 'Take the unverified pills to stay awake longer.',
              feedback: '⚠️ Dangerous Choice! Never consume unprescribed pills or chemical stimulants. They can cause severe cardiac and psychological emergencies.',
              is_safe: false,
              nextScene: 1,
            },
            {
              id: 'B',
              text: 'Stop studying, do a 5-minute Box Breathing exercise, drink water, and talk to Mom/Dad or call Tele-MANAS (14416).',
              feedback: '💚 Wise Choice! Your physical and mental health is 100x more important than any single exam score.',
              is_safe: true,
              nextScene: 1,
            },
          ],
        },
      ],
    },
    {
      id: 'story-03',
      title: 'Ananya & The Group Chat Dilemma',
      theme: 'Cyberbullying & Upstander Rights',
      character: 'Ananya, age 14',
      characterAvatar: '👧',
      background: 'bg-gradient-to-r from-rose-600 to-pink-700',
      description: 'Ananya sees edited embarrassing photos of her classmate Priya circulating in a school WhatsApp group chat.',
      scenes: [
        {
          id: 'scene-1',
          heading: 'Scene 1: The Viral Screenshot',
          narrative: 'Group members are laughing and forwarding the mean photos. Someone tags Ananya: "Ananya, add a funny caption!" What should Ananya do?',
          choices: [
            {
              id: 'A',
              text: 'Forward the image to other friends so she fits in with the group.',
              feedback: '⚠️ Harmful Choice! Forwarding abusive content makes you an accomplice to cyberbullying.',
              is_safe: false,
              nextScene: 1,
            },
            {
              id: 'B',
              text: 'Speak up in the chat: "This is not funny and it is cyberbullying." Take screenshots and message Priya privately to offer support.',
              feedback: '👑 Upstander Hero! Standing up against online bullying protects lives and sets a positive standard.',
              is_safe: true,
              nextScene: 1,
            },
          ],
        },
      ],
    },
  ];

  const currentStory = storyverse[selectedStoryIndex];
  const currentScene = currentStory?.scenes[currentSceneIndex];

  const handleSelectChoice = (choice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);

    if (choice.is_safe) {
      setSafetyScore((prev) => prev + 100);
      showToast('Safe & Empowered Choice! +100 Pts', 'success');
    } else {
      showToast('Safety Moment: Read the reflection below', 'warning');
    }
  };

  const handleNextScene = () => {
    setSelectedChoice(null);
    setAiAdvice(null);

    if (currentSceneIndex + 1 < currentStory.scenes.length) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else if (selectedStoryIndex + 1 < storyverse.length) {
      setSelectedStoryIndex((prev) => prev + 1);
      setCurrentSceneIndex(0);
    } else {
      setIsFinished(true);
    }
  };

  const handleAskAI = async () => {
    if (!currentScene) return;
    setLoadingAi(true);
    try {
      const res = await apiClient.post('/ai/chat', {
        message: `Give quick safety advice for this teenager situation: ${currentScene.narrative}`,
      });
      if (res.success && res.data) {
        setAiAdvice(res.data.reply);
      }
    } catch (err) {
      setAiAdvice('Always remember: You are never alone. Speak with a trusted adult or call 1098 if you feel unsafe.');
    } finally {
      setLoadingAi(false);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-fade-in">
        <Card className="p-8 text-center space-y-6 border-slate-200 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <Badge variant="mint">Storyverse Mastery Achieved</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Outstanding Decision-Making!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You completed all interactive safety stories, protected character boundaries, and demonstrated how to be a real-life upstander.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 flex justify-around items-center">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Safety Score</p>
              <p className="text-3xl font-black text-teal-800">{safetyScore} PTS</p>
            </div>
            <div className="h-10 w-px bg-teal-200" />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stories Solved</p>
              <p className="text-3xl font-black text-emerald-700">{storyverse.length} / {storyverse.length}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedStoryIndex(0);
                setCurrentSceneIndex(0);
                setSelectedChoice(null);
                setSafetyScore(0);
                setIsFinished(false);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Replay Stories
            </Button>
            <Link to="/dashboard/teen/certificates">
              <Button variant="primary">
                View My Safety Certificate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="primary">Interactive Storyverse 📖</Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Real-Life Decision Simulator
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              if (!isAudioEnabled && currentScene) {
                speakText(currentScene.narrative);
              } else {
                window.speechSynthesis?.cancel();
              }
            }}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isAudioEnabled ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {isAudioEnabled ? 'Audio On' : 'Narration'}
          </button>

          <div className="bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 text-teal-900 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>{safetyScore} Safety Pts</span>
          </div>
        </div>
      </div>

      {/* Story Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {storyverse.map((story, idx) => {
          const isSelected = selectedStoryIndex === idx;
          return (
            <Card
              key={story.id}
              onClick={() => {
                setSelectedStoryIndex(idx);
                setCurrentSceneIndex(0);
                setSelectedChoice(null);
                setAiAdvice(null);
              }}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/60 shadow-md ring-2 ring-teal-400'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{story.characterAvatar}</span>
                <Badge variant={isSelected ? 'primary' : 'neutral'}>{story.theme}</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{story.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{story.character}</p>
            </Card>
          );
        })}
      </div>

      {/* Active Scene Display */}
      {currentScene && (
        <Card className="p-6 sm:p-8 space-y-6 border-slate-200 shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 rounded-2xl bg-teal-50 border border-teal-200">
                {currentStory.characterAvatar}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentScene.heading}</h3>
                <p className="text-xs text-slate-500">Character: {currentStory.character}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={MessageCircle}
              onClick={handleAskAI}
              isLoading={loadingAi}
            >
              Ask AI Companion
            </Button>
          </div>

          {/* AI Companion Advice Box */}
          {aiAdvice && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs leading-relaxed space-y-1 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5 text-teal-900">
                <Sparkles className="w-4 h-4 text-teal-600" /> AI Safety Companion Analysis:
              </div>
              <p>{aiAdvice}</p>
            </div>
          )}

          {/* Scene Narrative */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
            <p className="font-bold text-slate-900 mb-1">The Situation:</p>
            {currentScene.narrative}
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              What is the best action for {currentStory.character.split(',')[0]}?
            </h4>
            {currentScene.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              let choiceStyle = 'border-slate-200 hover:border-teal-400 bg-white';

              if (selectedChoice) {
                if (isSelected) {
                  choiceStyle = choice.is_safe
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400'
                    : 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400';
                } else if (choice.is_safe) {
                  choiceStyle = 'border-emerald-300 bg-emerald-50/40 text-slate-600';
                } else {
                  choiceStyle = 'border-slate-200 opacity-50 bg-white';
                }
              }

              return (
                <div
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${choiceStyle}`}
                >
                  <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {choice.id}
                  </div>
                  <div className="text-xs sm:text-sm font-medium flex-1">
                    {choice.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Feedback */}
          {selectedChoice && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                selectedChoice.is_safe
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {selectedChoice.is_safe ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm leading-relaxed">
                <p className="font-bold">{selectedChoice.is_safe ? 'Safe & Empowered Action' : 'Safety Reflection'}</p>
                <p>{selectedChoice.feedback}</p>
              </div>
            </div>
          )}

          {/* Next Scene / Complete Button */}
          {selectedChoice && (
            <div className="flex justify-end pt-2">
              <Button variant="primary" size="lg" onClick={handleNextScene}>
                Next Scene / Story <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
