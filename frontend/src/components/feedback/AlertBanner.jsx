import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const AlertBanner = ({ type = 'info', title, message, action, className = '' }) => {
  const styles = {
    info: {
      border: 'border-safety-200',
      bg: 'bg-safety-50/80',
      text: 'text-safety-900',
      icon: <Info className="w-5 h-5 text-safety-600 shrink-0 mt-0.5" />,
    },
    success: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/80',
      text: 'text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    },
    warning: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/80',
      text: 'text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    },
    danger: {
      border: 'border-rose-200',
      bg: 'bg-rose-50/80',
      text: 'text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start gap-3.5 p-4 rounded-xl border ${current.border} ${current.bg} ${className}`}
    >
      {current.icon}
      <div className="flex-1 min-w-0">
        {title && <h4 className={`text-sm font-semibold mb-0.5 ${current.text}`}>{title}</h4>}
        {message && <div className={`text-sm leading-relaxed ${current.text} opacity-90`}>{message}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
