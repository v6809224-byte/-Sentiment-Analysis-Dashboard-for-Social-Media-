import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, HelpCircle, Info } from 'lucide-react';
import { KPIItem } from '../../types/analytics';

interface KpiGridProps {
  kpis: KPIItem[];
}

export const KpiGrid: React.FC<KpiGridProps> = ({ kpis }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => {
        const isPositive = kpi.change >= 0;
        
        // Micro sparkline SVG coordinates
        const minVal = Math.min(...kpi.sparkline);
        const maxVal = Math.max(...kpi.sparkline);
        const range = maxVal - minVal || 1;
        const width = 80;
        const height = 28;
        const points = kpi.sparkline
          .map((val, idx) => {
            const x = (idx / (kpi.sparkline.length - 1)) * width;
            const y = height - ((val - minVal) / range) * (height - 6) - 3;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <div
            key={kpi.id}
            className="group relative bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-5 hover:border-slate-700/90 hover:bg-slate-900 transition-all duration-150 flex flex-col justify-between"
          >
            {/* Top row: Label & Info Tooltip Trigger */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-slate-400 tracking-wide truncate">
                {kpi.label}
              </span>
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveTooltip(kpi.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === kpi.id ? null : kpi.id)}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-0.5"
                  aria-label={`About ${kpi.label}`}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>

                {activeTooltip === kpi.id && (
                  <div className="absolute right-0 top-6 w-56 p-2.5 rounded-lg bg-slate-950 border border-slate-700 shadow-xl z-20 text-[11px] text-slate-300 leading-relaxed">
                    {kpi.description}
                  </div>
                )}
              </div>
            </div>

            {/* Middle row: Big metric value */}
            <div className="my-1 flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-white font-mono tabular-nums">
                {kpi.value}
              </span>

              {/* Sparkline Visualizer */}
              <div className="shrink-0 pt-1" title="Trailing trendline">
                <svg width={width} height={height} className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={isPositive ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* Bottom row: Percentage change & benchmark kicker (No candy pills) */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 font-mono text-[11px]">
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <span
                  className={
                    isPositive ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'
                  }
                >
                  {isPositive ? `+${kpi.change}%` : `${kpi.change}%`}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono truncate text-right">
                {kpi.benchmark}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
