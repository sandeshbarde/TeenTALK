import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div
        className={`${sizeClasses[size]} border-teal-200 border-t-teal-600 rounded-full animate-spin mb-3`}
      />
      {message && <p className="text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
};
