import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Menu, X, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

export const PublicHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              Home
            </Link>
            <Link to="/how-it-works" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              How It Works
            </Link>
            <Link to="/modules" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              Modules
            </Link>
            <Link to="/stories" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              Stories
            </Link>
            <Link to="/resources" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              Resources
            </Link>
            <Link to="/support" className="text-sm font-semibold text-slate-600 hover:text-lavender-700 transition-colors">
              Support
            </Link>
            <Link
              to="/helpline"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-warmrose-700 bg-warmrose-50 px-3 py-1.5 rounded-full border border-warmrose-200 hover:bg-warmrose-100 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Emergency 1098
            </Link>
          </nav>

          {/* User / Auth CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(getDashboardRoute(user.role))}
                  icon={User}
                >
                  My Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              How It Works
            </Link>
            <Link
              to="/modules"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Safety Modules
            </Link>
            <Link
              to="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Stories & Decisions
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Safety Resources
            </Link>
            <Link
              to="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Support & Care
            </Link>
            <Link
              to="/file-complaint"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Confidential Report
            </Link>
            <Link
              to="/helpline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-semibold text-warmrose-700 bg-warmrose-50 rounded-lg"
            >
              Emergency Helplines (1098 / 112)
            </Link>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(getDashboardRoute(user.role));
                    }}
                  >
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" onClick={logout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
