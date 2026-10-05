import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'md', showText = true, className = '', link = '/' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className={`${sizeClasses[size]} rounded-2xl bg-white p-1 shadow-md shadow-teal-500/10 border border-slate-200/80 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden shrink-0`}>
        <img
          src="/logo.png"
          alt="TeenTalk Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
            Teen<span className="text-teal-600">Talk</span>
          </span>
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block -mt-1">
            Safe & Empowered
          </span>
        </div>
      )}
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }
  return content;
};
