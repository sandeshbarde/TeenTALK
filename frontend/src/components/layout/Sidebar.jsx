import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Award,
  Sparkles,
  Smile,
  FileText,
  Users,
  Building2,
  Calendar,
  AlertTriangle,
  History,
  Shield,
  FilePlus,
  HelpCircle,
  BarChart3,
  LogOut,
  Settings,
  User,
  Video,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getNavLinks = () => {
    switch (user.role) {
      case ROLES.TEEN:
        return [
          { to: '/dashboard/teen', label: 'Overview', icon: Home },
          { to: '/dashboard/teen/modules', label: 'Safety Modules', icon: BookOpen },
          { to: '/dashboard/teen/ai-videos', label: 'AI Safety Videos', icon: Video },
          { to: '/dashboard/teen/stories', label: 'Stories & Decisions', icon: Sparkles },
          { to: '/dashboard/teen/quizzes', label: 'Quizzes & Tests', icon: HelpCircle },
          { to: '/dashboard/teen/ai-chat', label: 'AI Safety Buddy', icon: Sparkles },
          { to: '/dashboard/teen/mood', label: 'Mood Tracker', icon: Smile },
          { to: '/dashboard/teen/certificates', label: 'My Certificates', icon: Award },
        ];
      case ROLES.ADULT:
        return [
          { to: '/dashboard/adult', label: 'Parent & Adult Hub', icon: Home },
          { to: '/dashboard/adult/modules', label: 'Adult Safety Modules', icon: BookOpen },
          { to: '/helpline', label: 'Emergency Helplines', icon: HelpCircle },
        ];
      case ROLES.EMPLOYEE:
        return [
          { to: '/dashboard/employee', label: 'Employee Hub', icon: Home },
          { to: '/dashboard/employee/learning', label: 'POSH Learning', icon: BookOpen },
          { to: '/dashboard/employee/documentation', label: 'Documentation', icon: FileText },
          { to: '/dashboard/employee/certificates', label: 'My Certificates', icon: Award },
          { to: '/file-complaint', label: 'File Complaint', icon: FilePlus },
          { to: '/track-complaint', label: 'Track Incident', icon: History },
        ];
      case ROLES.SCHOOL_ADMIN:
        return [
          { to: '/dashboard/school', label: 'School Analytics', icon: BarChart3 },
          { to: '/dashboard/school/students', label: 'Enrolled Students', icon: Users },
          { to: '/dashboard/school/modules', label: 'Curriculum Modules', icon: BookOpen },
        ];
      case ROLES.HR:
        return [
          { to: '/dashboard/hr', label: 'POSH Case Registry', icon: FileText },
          { to: '/dashboard/hr/cases', label: 'Active Inquiries', icon: AlertTriangle },
        ];
      case ROLES.COUNSELOR:
        return [
          { to: '/dashboard/counselor', label: 'Counseling Hub', icon: Home },
          { to: '/dashboard/counselor/notes', label: 'Confidential Notes', icon: FileText },
          { to: '/dashboard/counselor/calendar', label: 'Session Calendar', icon: Calendar },
        ];
      case ROLES.NGO:
        return [
          { to: '/dashboard/support', label: 'Support Cases', icon: Home },
          { to: '/helpline', label: 'Helpline Registry', icon: HelpCircle },
        ];
      case ROLES.SUPER_ADMIN:
      case ROLES.AUDITOR:
      case ROLES.CONTENT_MANAGER:
      default:
        return [
          { to: '/dashboard/admin', label: 'System Overview', icon: Home },
          { to: '/dashboard/admin/users', label: 'User Directory', icon: Users },
          { to: '/dashboard/admin/orgs', label: 'Organizations', icon: Building2 },
          { to: '/dashboard/admin/audit-logs', label: 'Audit Trail', icon: History },
          { to: '/modules', label: 'Modules Catalog', icon: BookOpen },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center px-5 border-b border-slate-800 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-md flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="TeenTalk" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1">
                Teen<span className="text-teal-400">Talk</span>
              </span>
              <span className="text-[10px] text-teal-400 font-bold block uppercase tracking-wider -mt-1">
                {ROLE_LABELS[user.role] || user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Main Menu
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to.split('/').length <= 3}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-1">
              Account & Privacy
            </div>
            <NavLink
              to="/dashboard/profile-setup"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-lavender-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Age & Profile Setup</span>
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-lavender-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Privacy & Security</span>
            </NavLink>
          </div>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-teal-600/30 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-sm">
              {user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.full_name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 border border-rose-900/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
