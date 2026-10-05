import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Lock, Scale, PhoneCall } from 'lucide-react';
import { CRISIS_NUMBERS } from '../../constants';

export const PublicFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-lavender-500 to-warmrose-500 flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">TeenTalk</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An academic multi-generational web platform fostering female safety, cyber hygiene, emotional wellbeing, and confidential harassment redressal across ages 10 to 50.
            </p>
            <div className="flex items-center gap-2 text-xs text-mint-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Knowledge & End-to-End Encrypted Redressal</span>
            </div>
          </div>

          {/* Col 2: Learning & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Learn & Explore</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/how-it-works" className="hover:text-lavender-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/modules" className="hover:text-lavender-300 transition-colors">
                  Safety Modules
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-lavender-300 transition-colors">
                  Interactive Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-lavender-300 transition-colors">
                  Safety Toolkits & Guides
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-lavender-300 transition-colors">
                  Care & Support Triage
                </Link>
              </li>
              <li>
                <Link to="/welcome" className="hover:text-lavender-300 transition-colors">
                  Experience Selector
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal & Institutional</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="hover:text-lavender-300 transition-colors">
                  School Partnerships
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-lavender-300 transition-colors">
                  Privacy Policy (DPDP)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-lavender-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/file-complaint" className="hover:text-lavender-300 transition-colors">
                  Anonymous Reporting
                </Link>
              </li>
              <li>
                <Link to="/track-complaint" className="hover:text-lavender-300 transition-colors">
                  Track Incident Code
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lavender-300 transition-colors">
                  Project Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Helplines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Emergency Hotlines</h4>
            <ul className="space-y-2.5">
              {CRISIS_NUMBERS.slice(0, 3).map((item) => (
                <li key={item.number} className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-200">{item.name}</span>
                    <span className="text-xs font-bold text-warmrose-400 font-mono">{item.number}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 TeenTalk Platform. Built for educational and institutional safety.</p>
          <div className="flex items-center gap-1">
            Created with <Heart className="w-3.5 h-3.5 text-warmrose-500 fill-warmrose-500 mx-1" /> by Team TeenTalk
            (Payal, Tejas, Nisha, Harshada)
          </div>
        </div>
      </div>
    </footer>
  );
};
