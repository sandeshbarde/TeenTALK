import React from 'react';

export const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex items-start justify-between gap-4 mb-5 ${className}`}>
      <div>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
