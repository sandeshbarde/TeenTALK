import React from 'react';

export const TextareaField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  required = false,
  disabled = false,
  helperText,
  className = '',
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full bg-white text-slate-900 border text-sm rounded-xl py-2.5 px-3.5 transition-all outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed resize-y ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-brand-500'
        }`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
