import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-900/90 rounded-xl border border-slate-850 p-5 h-[126px] flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 bg-slate-800 rounded w-24" />
              <div className="h-3 w-3 bg-slate-800 rounded-full" />
            </div>
            <div className="flex justify-between items-end my-1">
              <div className="h-7 bg-slate-800 rounded w-28" />
              <div className="h-6 bg-slate-800 rounded w-16" />
            </div>
            <div className="pt-2 border-t border-slate-800/60 flex justify-between">
              <div className="h-2.5 bg-slate-800 rounded w-14" />
              <div className="h-2.5 bg-slate-800 rounded w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Skeleton */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-850 p-6 h-[380px] flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-800 rounded w-48" />
            <div className="h-3 bg-slate-800/60 rounded w-72" />
          </div>
          <div className="h-8 bg-slate-800 rounded w-44" />
        </div>
        <div className="flex-1 bg-slate-950/60 rounded-lg border border-slate-850/60 flex items-center justify-center">
          <div className="h-4 bg-slate-800/40 rounded w-64" />
        </div>
      </div>

      {/* Secondary Dual Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 rounded-xl border border-slate-850 p-6 h-[320px] space-y-4">
          <div className="h-4 bg-slate-800 rounded w-40" />
          <div className="h-48 bg-slate-950/60 rounded-lg" />
        </div>
        <div className="bg-slate-900/90 rounded-xl border border-slate-850 p-6 h-[320px] space-y-4">
          <div className="h-4 bg-slate-800 rounded w-40" />
          <div className="h-48 bg-slate-950/60 rounded-lg" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-850 p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-slate-800 rounded w-40" />
          <div className="h-8 bg-slate-800 rounded w-64" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-10 bg-slate-950/60 rounded border border-slate-850/50" />
          ))}
        </div>
      </div>
    </div>
  );
};
