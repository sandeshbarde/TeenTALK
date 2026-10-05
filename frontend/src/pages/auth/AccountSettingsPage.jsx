import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  KeyRound,
  Bell,
  EyeOff,
  Building,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  FileText,
  Award,
  Trash2,
  ExternalLink,
  Printer,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { InputField } from '../../components/forms/InputField';
import { AlertBanner } from '../../components/feedback/AlertBanner';
import { EmptyState } from '../../components/feedback/EmptyState';
import apiClient from '../../services/apiClient';

export const AccountSettingsPage = () => {
  const { user, updateUser, deleteAccount } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [ageGroup, setAgeGroup] = useState(user?.age_group || '14-17');
  const [isSaving, setIsSaving] = useState(false);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Preferences
  const [anonymousMode, setAnonymousMode] = useState(user?.preferences?.is_anonymous || false);
  const [emailAlerts, setEmailAlerts] = useState(user?.preferences?.notifications ?? true);

  // Certificates
  const [myCertificates, setMyCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(false);

  // Deletion Modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (activeTab === 'certificates') {
      const fetchCerts = async () => {
        setLoadingCerts(true);
        try {
          const res = await apiClient.get('/certificate/my');
          if (res.success && res.data) {
            setMyCertificates(res.data);
          }
        } catch (err) {
          console.error('Failed to load certificates:', err);
        } finally {
          setLoadingCerts(false);
        }
      };
      fetchCerts();
    }
  }, [activeTab]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (updateUser) {
        await updateUser({
          full_name: fullName,
          phone,
          bio,
          age_group: ageGroup,
          preferences: {
            is_anonymous: anonymousMode,
            notifications: emailAlerts,
          },
        });
      }
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters.', 'error');
      return;
    }
    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      showToast('New password must contain both letters and numbers.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await apiClient.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password updated securely. Previous active sessions have been revoked.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update password.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      navigate('/login', { replace: true });
    } catch (err) {
      showToast(err.message || 'Failed to delete account.', 'error');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account & Privacy Settings</h1>
        <p className="text-sm text-slate-600 mt-1">
          Manage your personal details, safety preferences, credentials, and earned credentials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <User className="w-4 h-4" /> Profile Details
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <KeyRound className="w-4 h-4" /> Password & Security
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'certificates'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Award className="w-4 h-4" /> My Certificates
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" /> Privacy & Protection
        </button>
      </div>

      {activeTab === 'profile' && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-slate-200">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold border border-teal-200">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{user?.full_name}</h3>
                <Badge variant="primary">{user?.role?.toUpperCase()}</Badge>
              </div>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <InputField
                label="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">About / Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none"
                placeholder="Share a short note about your role or interests..."
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? 'Saving Changes...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
            <p className="text-xs text-slate-600">Ensure your account is using a strong, unique password.</p>
          </div>

          {passwordSuccess && (
            <AlertBanner
              type="success"
              title="Password Updated"
              message="Your password was successfully updated and older session tokens were revoked."
              onClose={() => setPasswordSuccess(false)}
            />
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <InputField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              icon={Lock}
            />
            <InputField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              icon={KeyRound}
              hint="Minimum 8 characters with at least one letter and number."
            />
            <InputField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              icon={Lock}
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
              <Shield className="w-4 h-4 text-teal-600" /> Active Session Invalidation
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you change your password, all prior authentication sessions and tokens are immediately revoked across all devices for your protection.
            </p>
          </div>
        </Card>
      )}

      {activeTab === 'certificates' && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">My Certificates</h3>
            <p className="text-xs text-slate-600">
              Verified certifications earned through TeenTalk awareness and learning programs.
            </p>
          </div>

          {loadingCerts ? (
            <div className="py-8 text-center text-xs text-slate-500">Loading your certificates...</div>
          ) : myCertificates.length === 0 ? (
            <EmptyState
              title="No Certificates Earned Yet"
              description="Complete the Teen Learning Program quiz (score 70%+) or the Employee POSH modules to earn and download your official certificates."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCertificates.map((cert) => (
                <div
                  key={cert.id || cert.certificate_code}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="primary">
                        {cert.program_type === 'employee' ? 'Employee POSH' : 'Teen Learning'}
                      </Badge>
                      <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {cert.certificate_code}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {cert.title || 'Certificate of Completion'}
                    </h4>
                    <p className="text-xs text-slate-600 mb-3">
                      Awarded to <strong className="text-slate-800">{cert.recipient_name}</strong>
                      {cert.score ? ` • Evaluated Score: ${cert.score}%` : ''}
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Issued: {new Date(cert.issue_date || cert.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link to={`/dashboard/teen/certificates/${cert.id}`}>
                      <Button variant="outline" size="sm" icon={ExternalLink}>
                        View Certificate
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Printer}
                      onClick={() => {
                        window.open(`/dashboard/teen/certificates/${cert.id}`, '_blank');
                      }}
                    >
                      Download / Print
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'privacy' && (
        <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Privacy & Protection Controls</h3>
            <p className="text-xs text-slate-600">Choose how your activity is shared across cohorts and exercise statutory data rights.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <EyeOff className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Anonymous Cohort Mode</h4>
                  <p className="text-xs text-slate-500">
                    Replace your full name with your chosen avatar in institutional aggregate completion statistics.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={anonymousMode}
                onChange={(e) => setAnonymousMode(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Weekly Wellbeing Reminders</h4>
                  <p className="text-xs text-slate-500">
                    Receive notifications to log your daily mood and review key safety habits.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Data Rights & Account Deletion */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-rose-900">Right to Erasure (Data Deletion)</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                As a user or minor beneficiary, you have the statutory right under DPDP guidelines to permanently erase your account profile, mood logs, and personal learning records.
              </p>
            </div>

            {showDeleteConfirm ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                <p className="text-xs font-semibold text-rose-900">
                  Are you absolutely sure? This action is permanent and cannot be undone. All your progress and profile records will be permanently wiped.
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDeleteAccount}
                    isLoading={isDeleting}
                    icon={Trash2}
                  >
                    Confirm Permanent Erasure
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-rose-700 border-rose-200 hover:bg-rose-50"
                onClick={() => setShowDeleteConfirm(true)}
                icon={Trash2}
              >
                Delete My Account & Personal Data
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
