import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, ShieldAlert, PhoneCall, AlertCircle, Bot, User, Info } from 'lucide-react';
import apiClient from '../../services/apiClient';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AIChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm your TeenTalk Safety Companion. I'm here to support you with questions about online privacy, friendship boundaries, dealing with bullying, or managing school stress. Everything we discuss here is private.",
      is_crisis: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'How do I handle cyberbullying on social media?',
    'Someone asked for my password in an online game',
    'Feeling very stressed about exams',
    'What is a healthy personal boundary?',
  ];

  const handleSend = async (messageToSend) => {
    const text = messageToSend || input;
    if (!text.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageToSend) setInput('');
    setLoading(true);

    try {
      const res = await apiClient.post('/ai/chat', { message: text.trim() });
      if (res.success && res.data) {
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: res.data.reply,
          is_crisis: res.data.is_crisis,
          is_refusal: res.data.is_refusal,
          escalation: res.data.escalation,
        };

        setMessages((prev) => [...prev, aiMsg]);

        if (res.data.is_crisis) {
          setCrisisAlert(res.data.escalation);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I'm having a little trouble connecting right now. If this is an emergency, please call 1098 or 112 immediately.",
          is_crisis: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
      {/* Safety Disclaimer Header */}
      <div className="flex items-center gap-2 p-3 bg-teal-50 border border-teal-200 text-teal-900 rounded-2xl text-xs">
        <Info className="w-4 h-4 text-teal-600 shrink-0" />
        <span>
          <strong>Educational Safe Space</strong>: TeenTalk AI is an educational buddy and does not substitute for a
          licensed counselor, physician, or legal advisor.
        </span>
      </div>

      {/* Immediate Crisis Escalation Alert Banner */}
      {crisisAlert && (
        <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl text-rose-950 text-xs animate-bounce-short">
          <div className="flex items-center gap-2 font-bold text-rose-800 text-sm mb-1">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            We Care About Your Life & Safety
          </div>
          <p className="mb-3 leading-relaxed">
            {crisisAlert.guidance} Free, confidential human support is ready to listen 24/7:
          </p>
          <div className="flex flex-wrap gap-2">
            {crisisAlert.hotlines?.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number.split('/')[0].trim()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {h.name}: {h.number}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Chat Container */}
      <Card className="p-0 overflow-hidden flex flex-col h-[650px] border-slate-200">
        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : m.is_crisis
                    ? 'bg-rose-600 text-white'
                    : 'bg-teal-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-teal-600 text-white rounded-tr-none'
                    : m.is_crisis
                    ? 'bg-rose-50 border border-rose-200 text-rose-950 rounded-tl-none font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse delay-150" />
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse delay-300" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border border-slate-200"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask anything about online safety, boundaries, or feelings..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
            <Button type="submit" variant="primary" size="md" isLoading={loading} icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
