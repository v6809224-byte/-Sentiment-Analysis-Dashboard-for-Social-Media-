import React from 'react';
import { Database, Plus, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Telemetry Records Found',
  description = 'Your active filters returned zero telemetry ingestion batches or customer accounts. Adjust your filters or generate simulated sample traffic.',
  actionLabel = 'Simulate Incoming Events',
  onAction,
  onReset,
}) => {
  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-12 text-center flex flex-col items-center justify-center min-h-[380px]">
      <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center mb-4">
        <Database className="w-6 h-6 text-indigo-400" />
      </div>

      <h3 className="text-base font-semibold text-white tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center gap-3">
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Active Filters</span>
          </button>
        )}

        {onAction && (
          <button
            onClick={onAction}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
