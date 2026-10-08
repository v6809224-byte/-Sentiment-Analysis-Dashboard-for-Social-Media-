import React, { useState } from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

export const SentimentDistributionDonut: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const data = [
    { label: 'Positive', percentage: 58.4, color: '#10b981', icon: Smile, count: '7,275 posts' },
    { label: 'Neutral', percentage: 24.7, color: '#38bdf8', icon: Meh, count: '3,077 posts' },
    { label: 'Negative', percentage: 16.9, color: '#f43f5e', icon: Frown, count: '2,106 posts' },
  ];

  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedOffset = 0;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800/60 mb-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          Sentiment Distribution
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Overall aggregate mood across 12,458 social posts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center flex-1">
        {/* Donut Chart */}
        <div className="sm:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {data.map((item) => {
                const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -accumulatedOffset;
                accumulatedOffset += (item.percentage / 100) * circumference;

                const isHovered = hoveredSlice === item.label;

                return (
                  <circle
                    key={item.label}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(item.label)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>

            {/* Central Summary Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {hoveredSlice || 'Dominant'}
              </span>
              <span className="text-2xl font-bold font-mono text-white tabular-nums">
                {hoveredSlice === 'Positive'
                  ? '58.4%'
                  : hoveredSlice === 'Neutral'
                  ? '24.7%'
                  : hoveredSlice === 'Negative'
                  ? '16.9%'
                  : '58.4%'}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                {hoveredSlice ? `${hoveredSlice} Tone` : 'Positive'}
              </span>
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div className="sm:col-span-6 space-y-2.5">
          {data.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredSlice === item.label;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredSlice(item.label)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-slate-800/90 border-slate-700 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-850/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-200">{item.label}</span>
                  </div>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {item.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <div className="mt-1 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Volume:</span>
                  <span>{item.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
