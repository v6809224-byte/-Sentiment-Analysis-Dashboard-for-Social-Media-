import React, { useState, useMemo } from 'react';
import { RevenueTimeSeriesPoint } from '../../types/analytics';
import { Eye, EyeOff } from 'lucide-react';

interface RevenueAreaChartProps {
  data: RevenueTimeSeriesPoint[];
  title?: string;
}

export const RevenueAreaChart: React.FC<RevenueAreaChartProps> = ({
  data,
  title = 'Recurring Revenue & Growth Trajectory',
}) => {
  const [metricMode, setMetricMode] = useState<'revenue' | 'accounts' | 'usage'>('revenue');
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  // Series visibility toggles
  const [showExpansion, setShowExpansion] = useState(true);
  const [showNetNew, setShowNetNew] = useState(true);

  // Chart Dimensions
  const svgWidth = 800;
  const svgHeight = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 65 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Calculate scales based on metricMode
  const { values, yMin, yMax, yTicks, formatY } = useMemo(() => {
    if (metricMode === 'accounts') {
      const vals = data.map((d) => d.activeAccounts);
      const min = Math.floor(Math.min(...vals) * 0.95);
      const max = Math.ceil(Math.max(...vals) * 1.05);
      return {
        values: vals,
        yMin: min,
        yMax: max,
        yTicks: [min, Math.round((min + max) / 2), max],
        formatY: (val: number) => `${val.toLocaleString()} accts`,
      };
    } else if (metricMode === 'usage') {
      const vals = data.map((d) => d.apiCallsK / 1000);
      const min = Math.max(0, Math.floor(Math.min(...vals) * 0.9));
      const max = Math.ceil(Math.max(...vals) * 1.1);
      return {
        values: vals,
        yMin: min,
        yMax: max,
        yTicks: [min, Math.round((min + max) / 2), max],
        formatY: (val: number) => `${val.toFixed(1)}M reqs`,
      };
    } else {
      const vals = data.map((d) => d.totalMrr);
      const min = Math.floor(Math.min(...vals) * 0.9);
      const max = Math.ceil(Math.max(...vals) * 1.05);
      const step = (max - min) / 4;
      return {
        values: vals,
        yMin: min,
        yMax: max,
        yTicks: [min, min + step, min + step * 2, min + step * 3, max],
        formatY: (val: number) => `$${(val / 1000).toFixed(0)}k`,
      };
    }
  }, [data, metricMode]);

  // Point Coordinate generator
  const getCoords = (valArr: number[]) => {
    return valArr.map((v, i) => {
      const x = padding.left + (i / (valArr.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((v - yMin) / (yMax - yMin || 1)) * chartHeight;
      return { x, y, raw: v };
    });
  };

  const primaryCoords = useMemo(() => getCoords(values), [values, yMin, yMax]);

  // Net New coordinates (when revenue mode)
  const netNewCoords = useMemo(() => {
    if (metricMode !== 'revenue') return [];
    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      // map to lower 30% of chart
      const y = padding.top + chartHeight - ((d.netNewMrr / 12000) * (chartHeight * 0.35));
      return { x, y, raw: d.netNewMrr };
    });
  }, [data, metricMode]);

  // Generate smooth cubic bezier SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (!pts.length) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    
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

  const primaryLinePath = useMemo(() => createSmoothPath(primaryCoords), [primaryCoords]);
  const primaryAreaPath = useMemo(() => {
    if (!primaryCoords.length) return '';
    const line = createSmoothPath(primaryCoords);
    const lastX = primaryCoords[primaryCoords.length - 1].x;
    const firstX = primaryCoords[0].x;
    const bottomY = padding.top + chartHeight;
    return `${line} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [primaryCoords]);

  const netNewLinePath = useMemo(() => createSmoothPath(netNewCoords), [netNewCoords]);

  // Active hover point
  const hoveredPoint = activeHoverIndex !== null ? data[activeHoverIndex] : null;
  const hoveredCoord = activeHoverIndex !== null ? primaryCoords[activeHoverIndex] : null;

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between">
      {/* Chart Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              {title}
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Live run-rate
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Normalized cohort trajectory with continuous expansion telemetry
          </p>
        </div>

        {/* Metric Switcher Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setMetricMode('revenue')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                metricMode === 'revenue'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MRR ($)
            </button>
            <button
              onClick={() => setMetricMode('accounts')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                metricMode === 'accounts'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Paid Accounts
            </button>
            <button
              onClick={() => setMetricMode('usage')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                metricMode === 'usage'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              API Volume
            </button>
          </div>
        </div>
      </div>

      {/* Series Legend & Toggles */}
      {metricMode === 'revenue' && (
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-indigo-500 rounded-full" />
            <span className="text-slate-300 font-medium">Total MRR</span>
          </div>

          <button
            onClick={() => setShowNetNew(!showNetNew)}
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
          >
            <span className={`w-3 h-1 rounded-full ${showNetNew ? 'bg-emerald-400' : 'bg-slate-700'}`} />
            <span className={showNetNew ? 'text-emerald-400 font-medium' : 'text-slate-500 line-through'}>
              Net New MRR
            </span>
          </button>
        </div>
      )}

      {/* SVG Responsive Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => setActiveHoverIndex(null)}
        >
          <defs>
            {/* Area Gradient */}
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.32" />
              <stop offset="85%" stopColor="#6366f1" stopOpacity="0.01" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="netNewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tickVal, idx) => {
            const yPos = padding.top + chartHeight - ((tickVal - yMin) / (yMax - yMin || 1)) * chartHeight;
            return (
              <g key={idx}>
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
                  {formatY(tickVal)}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={primaryAreaPath} fill="url(#revenueGradient)" />

          {/* Secondary Net New Line */}
          {metricMode === 'revenue' && showNetNew && (
            <path
              d={netNewLinePath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Primary Line */}
          <path
            d={primaryLinePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels & vertical touch trigger bands */}
          {data.map((item, idx) => {
            const xPos = padding.left + (idx / (data.length - 1)) * chartWidth;
            const isHovered = activeHoverIndex === idx;

            return (
              <g key={item.date}>
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

                {/* X Axis Label */}
                <text
                  x={xPos}
                  y={padding.top + chartHeight + 20}
                  textAnchor="middle"
                  className={`font-mono text-[11px] transition-colors ${
                    isHovered ? 'fill-indigo-300 font-semibold' : 'fill-slate-500'
                  }`}
                >
                  {item.label}
                </text>

                {/* Interactive transparent hit column */}
                <rect
                  x={xPos - chartWidth / (data.length * 2)}
                  y={padding.top}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  onMouseEnter={() => setActiveHoverIndex(idx)}
                  className="cursor-pointer"
                />
              </g>
            );
          })}

          {/* Active Hover Snap Circle */}
          {hoveredCoord && (
            <g>
              <circle
                cx={hoveredCoord.x}
                cy={hoveredCoord.y}
                r="6"
                fill="#6366f1"
                stroke="#0f172a"
                strokeWidth="2"
                className="transition-all duration-75"
              />
              <circle
                cx={hoveredCoord.x}
                cy={hoveredCoord.y}
                r="11"
                fill="#6366f1"
                fillOpacity="0.25"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Card */}
        {hoveredPoint && hoveredCoord && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75"
            style={{
              left: `${(hoveredCoord.x / svgWidth) * 100}%`,
              top: `${(hoveredCoord.y / svgHeight) * 100}%`,
              transform: `translate(${hoveredCoord.x > svgWidth / 2 ? '-108%' : '8%'}, -50%)`,
            }}
          >
            <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3 shadow-2xl backdrop-blur-md min-w-[170px] text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <span>{hoveredPoint.date}</span>
                <span className="text-slate-400">{hoveredPoint.label}</span>
              </div>

              {metricMode === 'revenue' ? (
                <div className="pt-2 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total MRR:</span>
                    <span className="font-bold text-white tabular-nums">
                      ${hoveredPoint.totalMrr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400">Net New:</span>
                    <span className="font-semibold text-emerald-300 tabular-nums">
                      +${hoveredPoint.netNewMrr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Expansion:</span>
                    <span className="text-slate-300 tabular-nums">
                      +${hoveredPoint.expansionMrr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Churn:</span>
                    <span className="text-rose-400 tabular-nums">
                      -${hoveredPoint.churnMrr.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : metricMode === 'accounts' ? (
                <div className="pt-2">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-slate-400">Active Accounts:</span>
                    <span className="font-bold text-white tabular-nums">
                      {hoveredPoint.activeAccounts.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-slate-400">API Events:</span>
                    <span className="font-bold text-white tabular-nums">
                      {(hoveredPoint.apiCallsK * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
