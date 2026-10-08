import React, { useState } from 'react';
import { ActivityEvent, ActivityEventType } from '../../types/analytics';
import { 
  ArrowUpRight, 
  CreditCard, 
  AlertTriangle, 
  UserPlus, 
  Cpu, 
  ExternalLink,
  Clock
} from 'lucide-react';

interface RecentActivityFeedProps {
  events: ActivityEvent[];
  isLive: boolean;
  onSelectEventCustomer?: (customerName: string) => void;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  events,
  isLive,
  onSelectEventCustomer,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = events.filter((e) => {
    if (filterType === 'all') return true;
    if (filterType === 'revenue')
      return e.type === 'subscription_upgraded' || e.type === 'payment_succeeded';
    if (filterType === 'risks') return e.type === 'churn_risk_flagged' || e.type === 'api_limit_warning';
    return true;
  });

  const getEventIcon = (type: ActivityEventType) => {
    switch (type) {
      case 'subscription_upgraded':
        return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
      case 'payment_succeeded':
        return <CreditCard className="w-4 h-4 text-indigo-400" />;
      case 'churn_risk_flagged':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'new_team_added':
        return <UserPlus className="w-4 h-4 text-sky-400" />;
      case 'api_limit_warning':
        return <Cpu className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 sm:p-6 flex flex-col justify-between">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Real-Time Ingestion Stream
            </h3>
            {isLive && (
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Ingest
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Synchronous ledger updates, seat migrations, and telemetry threshold alerts
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterType('revenue')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterType === 'revenue'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setFilterType('risks')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterType === 'risks'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Alerts
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/70 hover:border-slate-700 hover:bg-slate-850/40 transition-all flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              {getEventIcon(evt.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-xs text-slate-100 truncate">
                  {evt.title}
                </span>
                <span className="font-mono text-[11px] text-slate-400 shrink-0">
                  {evt.relativeTime}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {evt.description}
              </p>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => onSelectEventCustomer?.(evt.customerName)}
                  className="font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <span>{evt.customerName}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                {evt.amount && (
                  <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                    +${evt.amount.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
