import React from 'react';

export const SelectField = ({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  helperText,
  placeholder = 'Select an option',
  className = '',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full bg-white text-slate-900 border text-sm rounded-xl py-2.5 px-3.5 transition-all outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-brand-500'
        }`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
