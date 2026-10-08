import React, { useState, useMemo } from 'react';
import { SentimentTrendDay } from '../../types/sentiment';
import { Smile, Meh, Frown } from 'lucide-react';

interface SentimentTrendsChartProps {
  data: SentimentTrendDay[];
}

export const SentimentTrendsChart: React.FC<SentimentTrendsChartProps> = ({ data }) => {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [visibleSeries, setVisibleSeries] = useState({
    positive: true,
    neutral: true,
    negative: true,
  });

  const svgWidth = 840;
  const svgHeight = 300;
  const padding = { top: 25, right: 30, bottom: 45, left: 55 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const yMin = 0;
  const yMax = 80;
  const yTicks = [0, 20, 40, 60, 80];

  // Helper to map coordinates
  const getCoords = (key: 'positive' | 'neutral' | 'negative') => {
    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const val = d[key];
      const y = padding.top + chartHeight - ((val - yMin) / (yMax - yMin)) * chartHeight;
      return { x, y, val };
    });
  };

  const posCoords = useMemo(() => getCoords('positive'), [data]);
  const neuCoords = useMemo(() => getCoords('neutral'), [data]);
  const negCoords = useMemo(() => getCoords('negative'), [data]);

  // Cubic bezier SVG path generator
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const posLine = useMemo(() => createSmoothPath(posCoords), [posCoords]);
  const neuLine = useMemo(() => createSmoothPath(neuCoords), [neuCoords]);
  const negLine = useMemo(() => createSmoothPath(negCoords), [negCoords]);

  const posArea = useMemo(() => {
    if (!posCoords.length) return '';
    const line = createSmoothPath(posCoords);
    const lastX = posCoords[posCoords.length - 1].x;
    const firstX = posCoords[0].x;
    const bottomY = padding.top + chartHeight;
    return `${line} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [posCoords]);

  const hoveredDay = activeHoverIndex !== null ? data[activeHoverIndex] : null;
  const hoveredPos = activeHoverIndex !== null ? posCoords[activeHoverIndex] : null;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between">
      {/* Title & Series Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Sentiment Trends
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sentiment distribution across social media over the last 7 days
          </p>
        </div>

        {/* Legend buttons */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setVisibleSeries((s) => ({ ...s, positive: !s.positive }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              visibleSeries.positive
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-medium">Positive</span>
          </button>

          <button
            onClick={() => setVisibleSeries((s) => ({ ...s, neutral: !s.neutral }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              visibleSeries.neutral
                ? 'bg-sky-950/50 border-sky-500/40 text-sky-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="font-medium">Neutral</span>
          </button>

          <button
            onClick={() => setVisibleSeries((s) => ({ ...s, negative: !s.negative }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              visibleSeries.negative
                ? 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="font-medium">Negative</span>
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => setActiveHoverIndex(null)}
        >
          <defs>
            <linearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y axis ticks */}
          {yTicks.map((tick) => {
            const yPos = padding.top + chartHeight - ((tick - yMin) / (yMax - yMin)) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={svgWidth - padding.right}
                  y2={yPos}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="fill-slate-500 font-mono text-[11px]"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Positive Area Fill */}
          {visibleSeries.positive && <path d={posArea} fill="url(#posGradient)" />}

          {/* Neutral Line */}
          {visibleSeries.neutral && (
            <path
              d={neuLine}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Negative Line */}
          {visibleSeries.negative && (
            <path
              d={negLine}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Positive Line */}
          {visibleSeries.positive && (
            <path
              d={posLine}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* X Axis labels & hover trigger columns */}
          {data.map((item, idx) => {
            const xPos = padding.left + (idx / (data.length - 1)) * chartWidth;
            const isHovered = activeHoverIndex === idx;

            return (
              <g key={item.day}>
                {/* Vertical hover guide hairline */}
                {isHovered && (
                  <line
                    x1={xPos}
                    y1={padding.top}
                    x2={xPos}
                    y2={padding.top + chartHeight}
                    stroke="#475569"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Day label */}
                <text
                  x={xPos}
                  y={padding.top + chartHeight + 22}
                  textAnchor="middle"
                  className={`font-mono text-xs transition-colors ${
                    isHovered ? 'fill-emerald-300 font-bold' : 'fill-slate-400'
                  }`}
                >
                  {item.day}
                </text>

                {/* Transparent hit area */}
                <rect
                  x={xPos - chartWidth / (data.length * 2)}
                  y={padding.top}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  onMouseEnter={() => setActiveHoverIndex(idx)}
                />
              </g>
            );
          })}

          {/* Dots on Hover */}
          {activeHoverIndex !== null && (
            <>
              {visibleSeries.positive && (
                <circle
                  cx={posCoords[activeHoverIndex].x}
                  cy={posCoords[activeHoverIndex].y}
                  r="5"
                  fill="#10b981"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              )}
              {visibleSeries.neutral && (
                <circle
                  cx={neuCoords[activeHoverIndex].x}
                  cy={neuCoords[activeHoverIndex].y}
                  r="4.5"
                  fill="#38bdf8"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              )}
              {visibleSeries.negative && (
                <circle
                  cx={negCoords[activeHoverIndex].x}
                  cy={negCoords[activeHoverIndex].y}
                  r="4.5"
                  fill="#f43f5e"
                  stroke="#0f172a"
                  strokeWidth="2"
                />
              )}
            </>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredDay && hoveredPos && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75"
            style={{
              left: `${(hoveredPos.x / svgWidth) * 100}%`,
              top: `${(hoveredPos.y / svgHeight) * 100}%`,
              transform: `translate(${hoveredPos.x > svgWidth / 2 ? '-108%' : '8%'}, -50%)`,
            }}
          >
            <div className="bg-slate-950/95 border border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md min-w-[170px] text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="font-semibold text-white">{hoveredDay.day}</span>
                <span>{hoveredDay.dateLabel}</span>
              </div>
              <div className="pt-2 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Positive:</span>
                  <span className="font-bold tabular-nums">{hoveredDay.positive}%</span>
                </div>
                <div className="flex justify-between items-center text-sky-400">
                  <span>Neutral:</span>
                  <span className="font-medium tabular-nums">{hoveredDay.neutral}%</span>
                </div>
                <div className="flex justify-between items-center text-rose-400">
                  <span>Negative:</span>
                  <span className="font-medium tabular-nums">{hoveredDay.negative}%</span>
                </div>
                <div className="pt-1 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-400">
                  <span>Volume:</span>
                  <span className="text-slate-200 tabular-nums">{hoveredDay.total} posts</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
