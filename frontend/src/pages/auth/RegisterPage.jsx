import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from '../../components/forms/InputField';
import { SelectField } from '../../components/forms/SelectField';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ROLES, ROLE_LABELS } from '../../constants';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'teen',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [ageConsent, setAgeConsent] = useState(false);

  const roleOptions = [
    { value: ROLES.TEEN, label: 'Teen Learner (Student)' },
    { value: ROLES.ADULT, label: 'Adult / Parent / Guardian' },
    { value: ROLES.EMPLOYEE, label: 'Employee / Intern (POSH Redressal)' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!ageConsent) {
      setError('You must confirm age verification and consent to the Terms of Service to register.');
      return;
    }

    setIsLoading(true);

    try {
      const user = await register(formData);
      navigate(getDashboardRoute(user.role), { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your TeenTalk account</h1>
          <p className="text-xs text-slate-500 mt-1">
            Join thousands of students and mentors fostering safe digital spaces
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
              label="Full Name"
              name="full_name"
              placeholder="e.g. Priya Sharma"
              value={formData.full_name}
              onChange={handleChange}
              required
              icon={User}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. priya@greenwoodhigh.edu"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
            />

            <InputField
              label="Password (8-128 chars, letters & numbers)"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              icon={Lock}
            />

            <SelectField
              label="Account Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              required
            />

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ageConsent}
                  onChange={(e) => setAgeConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  required
                />
                <span>
                  I confirm that I am at least 13 years old (or have parental/guardian consent if under 18) and agree to TeenTalk's{' '}
                  <Link to="/terms" className="text-teal-600 underline">Terms</Link> and{' '}
                  <Link to="/privacy" className="text-teal-600 underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-3"
              isLoading={isLoading}
              icon={UserPlus}
            >
              Complete Registration
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-teal-600 hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
