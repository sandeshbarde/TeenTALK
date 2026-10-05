import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { InputField } from '../../components/forms/InputField';
import { AlertBanner } from '../../components/feedback/AlertBanner';
import apiClient from '../../services/apiClient';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to process password reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-sm">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Forgot your password?
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter the email address registered with your TeenTalk account to receive a secure recovery link.
          </p>
        </div>

        <Card className="p-8 shadow-md border-slate-200/80">
          {error && (
            <div className="mb-5">
              <AlertBanner
                type="danger"
                title="Request Failed"
                message={error}
                onClose={() => setError('')}
              />
            </div>
          )}

          {submitted ? (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">Recovery Link Dispatched</h3>
                <p className="text-sm text-slate-600">
                  If an account exists for <span className="font-semibold text-slate-800">{email}</span>, a secure password reset link has been dispatched.
                </p>
                <p className="text-xs text-slate-500">
                  The link expires in 30 minutes. In local development, the reset link is logged directly to the backend server console.
                </p>
              </div>

              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" className="w-full">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Registered Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={Mail}
                hint="Your email is strictly private and protected under statutory privacy guidelines."
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? 'Sending Instructions...' : 'Send Reset Instructions'}
              </Button>

              <div className="pt-2 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>

        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Zero-knowledge student identity protection standard</span>
        </div>
      </div>
    </div>
  );
};
