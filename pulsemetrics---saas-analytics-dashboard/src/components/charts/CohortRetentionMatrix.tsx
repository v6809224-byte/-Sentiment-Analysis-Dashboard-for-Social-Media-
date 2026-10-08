import React, { useState } from 'react';
import { CohortRow } from '../../types/analytics';
import { ShieldCheck, Info } from 'lucide-react';

interface CohortRetentionMatrixProps {
  cohorts: CohortRow[];
}

export const CohortRetentionMatrix: React.FC<CohortRetentionMatrixProps> = ({
  cohorts,
}) => {
  const [activeCell, setActiveCell] = useState<{
    cohort: string;
    monthIndex: number;
    pct: number;
    count: number;
  } | null>(null);

  // Retention color intensity mapper
  const getCellBackground = (pct: number) => {
    if (pct >= 95) return 'bg-emerald-500/30 text-emerald-200 border-emerald-500/40';
    if (pct >= 90) return 'bg-emerald-600/25 text-emerald-300 border-emerald-600/30';
    if (pct >= 85) return 'bg-emerald-700/20 text-emerald-300 border-emerald-700/20';
    if (pct >= 80) return 'bg-indigo-900/30 text-indigo-200 border-indigo-700/30';
    if (pct >= 75) return 'bg-indigo-950/40 text-indigo-300 border-indigo-800/30';
    return 'bg-slate-800/40 text-slate-400 border-slate-700/30';
  };

  const periodLabels = ['Month 0', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'];

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Customer Retention Cohort Heatmap
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">
              M3 Benchmark: 85.2%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Percentage of active customer organizations retained across successive billing periods
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>&lt;75%</span>
          <div className="flex gap-1">
            <span className="w-3.5 h-3.5 rounded bg-slate-800/60 border border-slate-700/30" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-900/30 border border-indigo-700/30" />
            <span className="w-3.5 h-3.5 rounded bg-emerald-700/20 border border-emerald-700/20" />
            <span className="w-3.5 h-3.5 rounded bg-emerald-500/30 border border-emerald-500/40" />
          </div>
          <span>&gt;95%</span>
        </div>
      </div>

      {/* Heatmap Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-3 font-medium">Cohort Batch</th>
              <th className="py-2.5 px-3 font-medium text-right">Initial Orgs</th>
              {periodLabels.map((label) => (
                <th key={label} className="py-2.5 px-3 font-medium text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 font-mono">
            {cohorts.map((row) => (
              <tr key={row.cohort} className="hover:bg-slate-850/40 transition-colors">
                <td className="py-2.5 px-3 font-medium text-slate-200 whitespace-nowrap">
                  {row.cohort}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-400 tabular-nums">
                  {row.initialSize}
                </td>
                {periodLabels.map((_, idx) => {
                  const pct = row.retention[idx];
                  const hasData = pct !== undefined;
                  const retainedCount = hasData
                    ? Math.round((row.initialSize * pct) / 100)
                    : 0;

                  return (
                    <td key={idx} className="py-1.5 px-1.5 text-center">
                      {hasData ? (
                        <div
                          onMouseEnter={() =>
                            setActiveCell({
                              cohort: row.cohort,
                              monthIndex: idx,
                              pct,
                              count: retainedCount,
                            })
                          }
                          onMouseLeave={() => setActiveCell(null)}
                          className={`w-full py-1.5 px-2 rounded border transition-transform duration-100 cursor-pointer text-center text-[11px] font-semibold tabular-nums hover:scale-105 ${getCellBackground(
                            pct
                          )}`}
                        >
                          {pct}%
                        </div>
                      ) : (
                        <span className="text-slate-700 text-center block">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cell inspection footer bar */}
      <div className="pt-3 border-t border-slate-800/60 mt-3 flex items-center justify-between text-xs">
        {activeCell ? (
          <div className="text-slate-300 font-mono flex items-center gap-2">
            <span className="text-indigo-400">{activeCell.cohort}</span>
            <span>·</span>
            <span>Month {activeCell.monthIndex}</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">{activeCell.pct}%</span>
            <span className="text-slate-400">({activeCell.count} organizations active)</span>
          </div>
        ) : (
          <span className="text-slate-500 text-[11px]">
            Hover over any cohort block to inspect retained organization counts.
          </span>
        )}

        <div className="text-[11px] font-mono text-slate-400">
          Logo Decay Rate: <span className="text-slate-200">0.38%/mo</span>
        </div>
      </div>
    </div>
  );
};
