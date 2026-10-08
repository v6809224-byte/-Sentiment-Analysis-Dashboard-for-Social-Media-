import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Layers, 
  CheckCircle2,
  Calendar,
  Zap
} from 'lucide-react';
import { RevenueTimeSeriesPoint } from '../../types/analytics';

interface RevenueViewProps {
  timeSeriesData: RevenueTimeSeriesPoint[];
}

export const RevenueView: React.FC<RevenueViewProps> = ({ timeSeriesData }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Starter Tier',
      priceMonthly: 99,
      priceAnnual: 89,
      currentMrr: 14200,
      activeOrgs: 420,
      growth: '+12.4%',
      features: ['Up to 5 team seats', '100,000 monthly telemetry events', 'Standard community support', '30-day log retention'],
      share: '11.0%',
    },
    {
      name: 'Pro Tier',
      priceMonthly: 499,
      priceAnnual: 429,
      currentMrr: 48600,
      activeOrgs: 710,
      growth: '+18.6%',
      features: ['Up to 25 team seats', '1,000,000 monthly telemetry events', '99.9% uptime SLA guarantee', 'Priority Slack channel'],
      share: '37.8%',
    },
    {
      name: 'Enterprise Tier',
      priceMonthly: 1999,
      priceAnnual: 1699,
      currentMrr: 65650,
      activeOrgs: 298,
      growth: '+28.2%',
      features: ['Unlimited team seats', 'Dedicated VPC / GovCloud deployments', 'Custom SOC2 Type II compliance reports', '24/7 dedicated solutions engineer'],
      share: '51.2%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Annual Run Rate (ARR)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              $1,541,400
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              +14.2% YoY
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            $128,450 MRR × 12 annualized forward multiplier
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            SaaS Quick Ratio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              3.82x
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              Benchmark: &gt;3.0x
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            (New MRR + Expansion) ÷ (Churned + Contraction)
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Average LTV : CAC Ratio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              4.6x
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              Payback: 6.2 mos
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Customer lifetime value ($9,100) vs CAC ($1,980)
          </span>
        </div>
      </div>

      {/* Tier Revenue Breakdown */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Subscription Plan Contribution & Economics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              MRR distribution by tier and customer capacity utilization
            </p>
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual Billing (Save 15%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-100">{p.name}</span>
                  <span className="text-xs font-mono text-emerald-400 font-medium">
                    {p.growth}
                  </span>
                </div>

                <div className="my-3">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    ${billingPeriod === 'annual' ? p.priceAnnual : p.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-400"> / org / mo</span>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-800/60 my-3 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Total MRR:</span>
                    <span className="text-slate-200 font-semibold tabular-nums">
                      ${p.currentMrr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Active Orgs:</span>
                    <span className="text-slate-200 font-semibold tabular-nums">
                      {p.activeOrgs}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Revenue Share:</span>
                    <span className="text-indigo-400 font-semibold tabular-nums">
                      {p.share}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mt-4 text-xs text-slate-300">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={() => alert(`Plan inspection: ${p.name} tier configurations.`)}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  Configure Tier Limits
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
