import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2, ShieldAlert, KeyRound } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { InputField } from '../../components/forms/InputField';
import { AlertBanner } from '../../components/feedback/AlertBanner';
import apiClient from '../../services/apiClient';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Missing password reset token. Please request a new link.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Password must contain both letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await apiClient.post('/auth/reset-password', {
        token,
        new_password: password,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
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
            Set New Password
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Create a strong, unique password for your TeenTalk account.
          </p>
        </div>

        <Card className="p-8 shadow-md border-slate-200/80">
          {!token ? (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">Invalid Reset Link</h3>
                <p className="text-sm text-slate-600">
                  No reset token was detected in the URL. Please request a fresh password reset email.
                </p>
              </div>
              <div className="pt-2">
                <Link to="/forgot-password">
                  <Button variant="primary" className="w-full">
                    Request New Reset Link
                  </Button>
                </Link>
              </div>
            </div>
          ) : success ? (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900">Password Reset Successful</h3>
                <p className="text-sm text-slate-600">
                  Your password has been securely updated. You can now log in using your new credentials.
                </p>
              </div>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" className="w-full">
                    Proceed to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <AlertBanner
                  type="danger"
                  title="Reset Error"
                  message={error}
                  onClose={() => setError('')}
                />
              )}

              <InputField
                label="New Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={Lock}
                hint="Must be 8-128 characters and contain letters and numbers."
              />

              <InputField
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                icon={Lock}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? 'Updating Password...' : 'Save New Password'}
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
      </div>
    </div>
  );
};
