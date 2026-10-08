import React from 'react';
import { 
  MessagesSquare, 
  Smile, 
  Meh, 
  Frown, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { TopStatItem } from '../../data/mockSentiment';

interface TopStatsGridProps {
  stats: TopStatItem[];
}

export const TopStatsGrid: React.FC<TopStatsGridProps> = ({ stats }) => {
  const getStatConfig = (type: TopStatItem['type']) => {
    switch (type) {
      case 'total':
        return {
          icon: MessagesSquare,
          iconColor: 'text-sky-400 bg-sky-950/40 border-sky-800/50',
          accentColor: 'text-white',
          sparkColor: '#38bdf8',
        };
      case 'positive':
        return {
          icon: Smile,
          iconColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50',
          accentColor: 'text-emerald-400',
          sparkColor: '#10b981',
        };
      case 'neutral':
        return {
          icon: Meh,
          iconColor: 'text-slate-300 bg-slate-800/60 border-slate-700/60',
          accentColor: 'text-slate-200',
          sparkColor: '#94a3b8',
        };
      case 'negative':
        return {
          icon: Frown,
          iconColor: 'text-rose-400 bg-rose-950/40 border-rose-800/50',
          accentColor: 'text-rose-400',
          sparkColor: '#f43f5e',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const config = getStatConfig(stat.type);
        const Icon = config.icon;

        // Sparkline coordinates
        const minVal = Math.min(...stat.sparkline);
        const maxVal = Math.max(...stat.sparkline);
        const range = maxVal - minVal || 1;
        const width = 84;
        const height = 26;
        const points = stat.sparkline
          .map((val, idx) => {
            const x = (idx / (stat.sparkline.length - 1)) * width;
            const y = height - ((val - minVal) / range) * (height - 6) - 3;
            return `${x},${y}`;
          })
          .join(' ');

        return (
          <div
            key={stat.id}
            className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 hover:border-slate-700 hover:bg-slate-900 transition-all duration-150 flex flex-col justify-between"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-slate-400 tracking-wide">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg border ${config.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Middle row: Big Metric Value & Sparkline */}
            <div className="my-1 flex items-baseline justify-between gap-3">
              <span className={`text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums ${config.accentColor}`}>
                {stat.value}
              </span>

              <div className="shrink-0 pt-1" title="Trailing trendline">
                <svg width={width} height={height} className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={config.sparkColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>

            {/* Bottom row: Change percentage & Benchmark context */}
            <div className="pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 font-mono text-[11px]">
                {stat.change.startsWith('+') ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <span
                  className={
                    stat.type === 'negative'
                      ? 'text-emerald-400 font-semibold' // a drop in negative is good
                      : stat.change.startsWith('+')
                      ? 'text-emerald-400 font-semibold'
                      : 'text-rose-400 font-semibold'
                  }
                >
                  {stat.change}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono truncate text-right">
                {stat.benchmark}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
