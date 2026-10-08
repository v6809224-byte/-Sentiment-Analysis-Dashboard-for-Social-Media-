import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Download, 
  Calendar, 
  Check, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { SentimentTab } from '../../types/sentiment';

interface HeaderProps {
  currentTab: SentimentTab;
  onOpenMobile: () => void;
  onExport: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  dateRange: string;
  onDateRangeChange: (r: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobile,
  onExport,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportClick = () => {
    onExport();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2200);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Mobile Button + Titles */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobile}
            className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Sentiment Analysis Dashboard
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Live NLP
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Understand what people are saying across social media.
            </p>
          </div>
        </div>

        {/* Right Controls: Search, Date Filter, Notifications, Export */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Search Input */}
          <div className="relative min-w-[180px] sm:min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search posts, hashtags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Date Filter ("Last 7 Days") */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="Last 7 Days" className="bg-slate-900 text-slate-200">
                Last 7 Days
              </option>
              <option value="Last 24 Hours" className="bg-slate-900 text-slate-200">
                Last 24 Hours
              </option>
              <option value="Last 30 Days" className="bg-slate-900 text-slate-200">
                Last 30 Days
              </option>
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors shadow-sm shadow-emerald-600/20"
            title="Export sentiment report as CSV"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Export</span>
              </>
            )}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 relative transition-colors"
              aria-label="Social media alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-3">
                  <span className="text-xs font-semibold text-white">
                    Sentiment Alerts
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    2 new
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <p className="font-medium text-emerald-400">
                      Positive Sentiment Spike: +18%
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Instagram feedback surging following campus event hashtag #CampusFest2026
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      15 mins ago
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <p className="font-medium text-rose-400">
                      Negative Trend Detected
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Twitter reports citing sound system issues at main stage
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      2 hours ago
                    </span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-800 mt-2.5 text-center">
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
