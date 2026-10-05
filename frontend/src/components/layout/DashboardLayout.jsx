import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Bell, Shield, ArrowLeft } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Role Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-16 sm:h-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
                {ROLE_LABELS[user?.role] || 'Dashboard'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                TeenTalk Safe Workspace
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Public Portal
            </Link>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
