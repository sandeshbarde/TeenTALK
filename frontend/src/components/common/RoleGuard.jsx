import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AlertBanner } from '../feedback/AlertBanner';

export const RoleGuard = ({ allowedRoles = [], children }) => {
  const { user, getDashboardRoute } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Super admin has universal access
  if (user.role === 'super_admin') {
    return children;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="p-6">
        <AlertBanner
          type="danger"
          title="Access Restricted by Role"
          message={`Your current role (${user.role}) does not have permission to view this view. You have been redirected according to safety protocols.`}
          action={
            <a
              href={getDashboardRoute(user.role)}
              className="text-xs font-bold underline hover:opacity-80"
            >
              Go to my Dashboard
            </a>
          }
        />
      </div>
    );
  }

  return children;
};
