import React, { useState } from 'react';
import { CustomerItem } from '../../types/analytics';
import { 
  X, 
  Building, 
  Mail, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  Cpu, 
  Users, 
  CheckCircle,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

interface CustomerDetailModalProps {
  customer: CustomerItem | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: any) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose,
  onUpdateStatus,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!customer) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-mono text-sm font-bold text-indigo-300">
              {customer.company.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-white">
                  {customer.company}
                </h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/60 text-indigo-300">
                  {customer.plan} Tier
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Organization ID: <span className="font-mono text-slate-300">{customer.id}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">MRR Value</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                ${customer.mrr.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                Annual: ${(customer.mrr * 12).toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">Health Index</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {customer.healthScore} / 100
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                {customer.healthScore > 80 ? 'Optimal' : customer.healthScore > 60 ? 'Needs Attention' : 'Churn Risk'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono block">Seat Density</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {customer.seatsUsed} / {customer.totalSeats}
              </span>
              <span className="text-[10px] text-indigo-400 font-mono mt-0.5 block">
                {Math.round((customer.seatsUsed / customer.totalSeats) * 100)}% utilized
              </span>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Account Attributes
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-850 bg-slate-800/30 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Primary Technical Contact
                </span>
                <span className="text-slate-200 font-medium block">
                  {customer.name} ({customer.email})
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-850 bg-slate-800/30 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Data Plane Region
                </span>
                <span className="text-slate-200 font-medium font-mono text-[11px] block">
                  {customer.region}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-850 bg-slate-800/30 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Contract Inception
                </span>
                <span className="text-slate-200 font-medium font-mono text-[11px] block">
                  {customer.joinedDate}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-850 bg-slate-800/30 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Next Renewal Cycle
                </span>
                <span className="text-slate-200 font-medium font-mono text-[11px] block">
                  {customer.renewalDate}
                </span>
              </div>
            </div>
          </div>

          {/* API Consumption Gauge */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Monthly API Quota Utilization
              </span>
              <span className="font-mono text-slate-300">{customer.apiUsagePercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  customer.apiUsagePercent > 85 ? 'bg-amber-400' : 'bg-indigo-500'
                }`}
                style={{ width: `${customer.apiUsagePercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Rate ceiling: 2,500 req/min · P99 Latency: 42ms
            </p>
          </div>
        </div>

        {/* Modal Footer with Interactive Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs">
            {toastMessage && (
              <span className="text-emerald-400 font-medium animate-pulse">
                ✓ {toastMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Generated customer telemetry audit PDF')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              Export Audit
            </button>
            <button
              onClick={() => {
                showToast(`Executive outreach notification dispatched to ${customer.email}`);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-sm transition-colors"
            >
              Contact Org Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
