import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ProgressAreaChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="completion" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorProgress)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ScoreBarChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="title" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="completions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MoodLineChart = ({ data = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ r: 5, fill: '#0f766e', strokeWidth: 2, stroke: '#ffffff' }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
