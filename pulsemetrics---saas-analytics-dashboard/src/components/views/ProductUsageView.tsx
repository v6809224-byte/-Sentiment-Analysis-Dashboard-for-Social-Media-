import React from 'react';
import { Activity, Server, Cpu, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export const ProductUsageView: React.FC = () => {
  const endpoints = [
    {
      path: 'POST /v1/telemetry/events',
      throughput: '1,840 req/s',
      p50: '8 ms',
      p95: '24 ms',
      p99: '42 ms',
      errorRate: '0.002%',
      status: 'Healthy',
    },
    {
      path: 'GET /v1/analytics/cohorts',
      throughput: '420 req/s',
      p50: '18 ms',
      p95: '48 ms',
      p99: '82 ms',
      errorRate: '0.015%',
      status: 'Healthy',
    },
    {
      path: 'POST /v1/auth/session-token',
      throughput: '890 req/s',
      p50: '6 ms',
      p95: '16 ms',
      p99: '31 ms',
      errorRate: '0.001%',
      status: 'Healthy',
    },
    {
      path: 'POST /v1/webhooks/deliver',
      throughput: '340 req/s',
      p50: '22 ms',
      p95: '64 ms',
      p99: '110 ms',
      errorRate: '0.048%',
      status: 'Healthy',
    },
  ];

  const features = [
    { name: 'Live Stream Ingestion', adoption: '94%', activeAccounts: '1,342 orgs', status: 'Core' },
    { name: 'Cohort Retention Analyzer', adoption: '78%', activeAccounts: '1,114 orgs', status: 'Core' },
    { name: 'Automated Webhook Subscriptions', adoption: '62%', activeAccounts: '885 orgs', status: 'Pro+' },
    { name: 'Enterprise SAML/SSO Directory Sync', adoption: '21%', activeAccounts: '299 orgs', status: 'Enterprise' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Global P99 Latency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              42 ms
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              -6ms vs SLA
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Across 14 edge POP edge regions
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Peak Ingest Throughput
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              3,490 /s
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              +18% peak
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Zero dropped packets in buffer queue
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            System Availability SLA
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              99.985%
            </span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              Nominal
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Trailing 90-day window
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Daily Active Teams (DAT)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              1,210
            </span>
            <span className="text-xs font-semibold text-indigo-400 font-mono">
              84.7% of total
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Organizations with active daily logins
          </span>
        </div>
      </div>

      {/* API Endpoint Telemetry Table */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6">
        <div className="pb-4 border-b border-slate-800/80 mb-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            API Ingest Endpoints & Response Latency
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Microsecond-benchmarked telemetry collected from edge load balancers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3 font-medium">Route Specification</th>
                <th className="py-2.5 px-3 font-medium text-right">Throughput</th>
                <th className="py-2.5 px-3 font-medium text-right">P50</th>
                <th className="py-2.5 px-3 font-medium text-right">P95</th>
                <th className="py-2.5 px-3 font-medium text-right">P99</th>
                <th className="py-2.5 px-3 font-medium text-right">Error Rate</th>
                <th className="py-2.5 px-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {endpoints.map((ep) => (
                <tr key={ep.path} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-medium text-indigo-300">
                    {ep.path}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-200 tabular-nums">
                    {ep.throughput}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">
                    {ep.p50}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 tabular-nums">
                    {ep.p95}
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-semibold tabular-nums">
                    {ep.p99}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400 tabular-nums">
                    {ep.errorRate}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {ep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Adoption Matrix */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6">
        <div className="pb-4 border-b border-slate-800/80 mb-4">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Feature Adoption & Usage Velocity
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Percentage of active accounts utilizing core modular capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.name}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  {f.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                  {f.activeAccounts} · {f.status} Tier
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums block">
                  {f.adoption}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Adoption</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
