import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from '../../components/forms/InputField';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ROLES, ROLE_LABELS } from '../../constants';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, getDashboardRoute } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password);
      const targetRoute = from || getDashboardRoute(user.role);
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account quick switch
  const selectDemoRole = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to TeenTalk</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your secure learning, administration, or support console
          </p>
        </div>

        <Card className="p-8 shadow-sm">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Address"
              type="email"
              placeholder="e.g. teen@teentalk.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={Mail}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={Lock}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={LogIn}
            >
              Sign In
            </Button>
          </form>

          {/* Quick Demo Switcher for Evaluation */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>One-Click Academic Role Evaluator:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => selectDemoRole('teen@teentalk.org')}
                className="p-2 text-left rounded-lg bg-teal-50 hover:bg-teal-100/80 text-teal-800 font-semibold border border-teal-200/60 transition-colors"
              >
                👧 Teen
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('adult@teentalk.org')}
                className="p-2 text-left rounded-lg bg-blue-50 hover:bg-blue-100/80 text-blue-800 font-semibold border border-blue-200/60 transition-colors"
              >
                👨‍👩‍👦 Adult/Parent
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('school@teentalk.org')}
                className="p-2 text-left rounded-lg bg-amber-50 hover:bg-amber-100/80 text-amber-800 font-semibold border border-amber-200/60 transition-colors"
              >
                🏫 School Admin
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('employee@teentalk.org')}
                className="p-2 text-left rounded-lg bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-semibold border border-emerald-200/60 transition-colors"
              >
                💼 Employee
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('hr@teentalk.org')}
                className="p-2 text-left rounded-lg bg-rose-50 hover:bg-rose-100/80 text-rose-800 font-semibold border border-rose-200/60 transition-colors"
              >
                ⚖️ HR / POSH
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('counselor@teentalk.org')}
                className="p-2 text-left rounded-lg bg-purple-50 hover:bg-purple-100/80 text-purple-800 font-semibold border border-purple-200/60 transition-colors"
              >
                🧠 Counselor
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('ngo@teentalk.org')}
                className="p-2 text-left rounded-lg bg-cyan-50 hover:bg-cyan-100/80 text-cyan-800 font-semibold border border-cyan-200/60 transition-colors"
              >
                🤝 NGO
              </button>
              <button
                type="button"
                onClick={() => selectDemoRole('admin@teentalk.org')}
                className="p-2 text-left rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-300 transition-colors"
              >
                ⚡ Super Admin
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-teal-600 hover:underline">
              Create Teen Account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
