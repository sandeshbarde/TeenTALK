import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import { PublicHeader } from '../components/layout/PublicHeader';
import { PublicFooter } from '../components/layout/PublicFooter';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { RoleGuard } from '../components/common/RoleGuard';

// Public & Info Pages
import { LandingPage } from '../pages/public/LandingPage';
import { AboutPage } from '../pages/public/AboutPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { SafetyResourcesPage } from '../pages/public/SafetyResourcesPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPolicyPage } from '../pages/public/PrivacyPolicyPage';
import { TermsPage } from '../pages/public/TermsPage';
import { EmergencyHelplinePage } from '../pages/public/EmergencyHelplinePage';

// Auth & Onboarding Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { WelcomeExperiencePage } from '../pages/auth/WelcomeExperiencePage';
import { ProfileSetupPage } from '../pages/auth/ProfileSetupPage';
import { AccountSettingsPage } from '../pages/auth/AccountSettingsPage';
import { EmployeeLearningPage } from '../pages/employee/EmployeeLearningPage';
import { EmployeeModuleDetailPage } from '../pages/employee/EmployeeModuleDetailPage';
import { EmployeeDocumentationPage } from '../pages/employee/EmployeeDocumentationPage';

// Shared / Learning / Support Pages
import { SafetyModulesPage } from '../pages/teen/SafetyModulesPage';
import { ModuleDetailPage } from '../pages/teen/ModuleDetailPage';
import { StoryPlayerPage } from '../pages/learning/StoryPlayerPage';
import { FileComplaintPage } from '../pages/employee/FileComplaintPage';
import { TrackComplaintPage } from '../pages/employee/TrackComplaintPage';
import { GetSupportPage } from '../pages/support/GetSupportPage';
import { CaseDetailPage } from '../pages/support/CaseDetailPage';

// Dashboards
import { TeenDashboard } from '../pages/teen/TeenDashboard';
import { AIChatPage } from '../pages/teen/AIChatPage';
import { MoodTrackerPage } from '../pages/teen/MoodTrackerPage';
import { QuizPage } from '../pages/teen/QuizPage';
import { CertificatePage } from '../pages/teen/CertificatePage';
import { AIVideosPage } from '../pages/teen/AIVideosPage';

import { AdultDashboard } from '../pages/adult/AdultDashboard';
import { AdultModulesPage } from '../pages/adult/AdultModulesPage';
import { EmployeeDashboard } from '../pages/employee/EmployeeDashboard';
import { SchoolDashboard } from '../pages/school/SchoolDashboard';
import { StudentsListPage } from '../pages/school/StudentsListPage';
import { HRDashboard } from '../pages/hr/HRDashboard';
import { SupportDashboard } from '../pages/ngo/SupportDashboard';
import { CounselorCalendarPage } from '../pages/ngo/CounselorCalendarPage';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { UsersManagePage } from '../pages/admin/UsersManagePage';
import { OrgsManagePage } from '../pages/admin/OrgsManagePage';
import { AuditLogsPage } from '../pages/admin/AuditLogsPage';

// Public Layout Wrapper
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <PublicHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Header & Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/resources" element={<SafetyResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/helpline" element={<EmergencyHelplinePage />} />

        {/* Learning & Support */}
        <Route path="/modules" element={<SafetyModulesPage />} />
        <Route path="/modules/:id" element={<ModuleDetailPage />} />
        <Route path="/stories" element={<StoryPlayerPage />} />
        <Route path="/support" element={<GetSupportPage />} />
        <Route path="/file-complaint" element={<FileComplaintPage />} />
        <Route path="/track-complaint" element={<TrackComplaintPage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />
        <Route path="/complaints/:id" element={<CaseDetailPage />} />

        {/* Auth & Onboarding */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomeExperiencePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Teen Learner Track (Payal & Harshada) */}
        <Route
          path="teen"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <TeenDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="teen/modules"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <SafetyModulesPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/modules/:id"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <ModuleDetailPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/ai-videos"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <AIVideosPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/stories"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <StoryPlayerPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/quizzes/:id"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <QuizPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/quizzes"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <SafetyModulesPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/ai-chat"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <AIChatPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/mood"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <MoodTrackerPage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/certificates/:courseId"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <CertificatePage />
            </RoleGuard>
          }
        />
        <Route
          path="teen/certificates"
          element={
            <RoleGuard allowedRoles={['teen']}>
              <CertificatePage />
            </RoleGuard>
          }
        />

        {/* Adult / Parent Track (Harshada) */}
        <Route
          path="adult"
          element={
            <RoleGuard allowedRoles={['adult']}>
              <AdultDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="adult/modules"
          element={
            <RoleGuard allowedRoles={['adult']}>
              <AdultModulesPage />
            </RoleGuard>
          }
        />

        {/* Employee Track (Nisha) */}
        <Route
          path="employee"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <EmployeeDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="employee/learning"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <EmployeeLearningPage />
            </RoleGuard>
          }
        />
        <Route
          path="employee/learning/:id"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <EmployeeModuleDetailPage />
            </RoleGuard>
          }
        />
        <Route
          path="employee/documentation"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <EmployeeDocumentationPage />
            </RoleGuard>
          }
        />
        <Route
          path="employee/certificates"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <CertificatePage />
            </RoleGuard>
          }
        />
        <Route
          path="employee/certificates/:courseId"
          element={
            <RoleGuard allowedRoles={['employee']}>
              <CertificatePage />
            </RoleGuard>
          }
        />

        {/* School Admin Track (Tejas) */}
        <Route
          path="school"
          element={
            <RoleGuard allowedRoles={['school_admin']}>
              <SchoolDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="school/students"
          element={
            <RoleGuard allowedRoles={['school_admin']}>
              <StudentsListPage />
            </RoleGuard>
          }
        />
        <Route
          path="school/modules"
          element={
            <RoleGuard allowedRoles={['school_admin']}>
              <SafetyModulesPage />
            </RoleGuard>
          }
        />

        {/* HR & POSH Track (Nisha) */}
        <Route
          path="hr"
          element={
            <RoleGuard allowedRoles={['hr']}>
              <HRDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="hr/cases"
          element={
            <RoleGuard allowedRoles={['hr']}>
              <HRDashboard />
            </RoleGuard>
          }
        />

        {/* Counselor & NGO Track (Nisha) */}
        <Route
          path="support"
          element={
            <RoleGuard allowedRoles={['ngo', 'counselor']}>
              <SupportDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="counselor"
          element={
            <RoleGuard allowedRoles={['counselor']}>
              <SupportDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="counselor/notes"
          element={
            <RoleGuard allowedRoles={['counselor']}>
              <SupportDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="counselor/calendar"
          element={
            <RoleGuard allowedRoles={['counselor']}>
              <CounselorCalendarPage />
            </RoleGuard>
          }
        />

        {/* Super Admin, Auditor & Content Manager Track (Tejas) */}
        <Route
          path="admin"
          element={
            <RoleGuard allowedRoles={['super_admin', 'auditor', 'content_manager']}>
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="admin/users"
          element={
            <RoleGuard allowedRoles={['super_admin']}>
              <UsersManagePage />
            </RoleGuard>
          }
        />
        <Route
          path="admin/orgs"
          element={
            <RoleGuard allowedRoles={['super_admin', 'auditor']}>
              <OrgsManagePage />
            </RoleGuard>
          }
        />
        <Route
          path="admin/audit-logs"
          element={
            <RoleGuard allowedRoles={['super_admin', 'auditor']}>
              <AuditLogsPage />
            </RoleGuard>
          }
        />

        {/* Universal User Settings & Case Inspection */}
        <Route path="settings" element={<AccountSettingsPage />} />
        <Route path="profile-setup" element={<ProfileSetupPage />} />
        <Route path="cases/:id" element={<CaseDetailPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
