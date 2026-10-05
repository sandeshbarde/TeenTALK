import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'sm', className = '' }) => {
  const variantClasses = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-brand-50 text-brand-700 border-brand-200',
    blue: 'bg-safety-50 text-safety-700 border-safety-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 font-medium rounded-full',
    md: 'text-sm px-3 py-1 font-medium rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border leading-none tracking-wide ${
        variantClasses[variant] || variantClasses.neutral
      } ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
