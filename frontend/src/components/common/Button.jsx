import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const variantClasses = {
    primary:
      'bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/20 active:bg-brand-800 border-transparent',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 active:bg-slate-300 border-transparent',
    outline:
      'bg-transparent hover:bg-slate-50 text-slate-700 border-slate-300 active:bg-slate-100',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 active:bg-rose-800 border-transparent',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 active:bg-slate-200 border-transparent shadow-none',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};
