import React, { useState } from 'react';
import { AcquisitionChannel } from '../../types/analytics';
import { ArrowUpRight } from 'lucide-react';

interface AcquisitionChannelsChartProps {
  channels: AcquisitionChannel[];
}

export const AcquisitionChannelsChart: React.FC<AcquisitionChannelsChartProps> = ({
  channels,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalRevenue = channels.reduce((acc, c) => acc + c.revenueGenerated, 0);
  const totalVisitors = channels.reduce((acc, c) => acc + c.visitors, 0);

  // SVG Donut calculation
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Acquisition & Funnel Channels
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Traffic attribution, signups, and conversion yield
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-semibold">
          Avg Conv: 4.1%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart Visualizer */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {channels.map((ch, idx) => {
                const strokeDasharray = `${(ch.sharePercentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -cumulativeOffset;
                cumulativeOffset += (ch.sharePercentage / 100) * circumference;

                const isHovered = hoveredIndex === idx;

                return (
                  <circle
                    key={ch.name}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={ch.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>

            {/* Central summary readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {hoveredIndex !== null ? channels[hoveredIndex].name.split(' ')[0] : 'Inbound MRR'}
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-white">
                {hoveredIndex !== null
                  ? `$${(channels[hoveredIndex].revenueGenerated / 1000).toFixed(1)}k`
                  : `$${(totalRevenue / 1000).toFixed(1)}k`}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {hoveredIndex !== null
                  ? `${channels[hoveredIndex].sharePercentage}% share`
                  : `${(totalVisitors / 1000).toFixed(0)}k visitors`}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Channel rows */}
        <div className="md:col-span-7 space-y-2.5">
          {channels.map((channel, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={channel.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  isHovered
                    ? 'bg-slate-800/80 border-slate-700 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="font-medium text-slate-200 truncate">
                      {channel.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                    <span className="text-slate-400">
                      {(channel.visitors / 1000).toFixed(1)}k vis
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {channel.conversionRate}% conv
                    </span>
                  </div>
                </div>

                {/* Micro progress bar */}
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${channel.sharePercentage}%`,
                      backgroundColor: channel.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
