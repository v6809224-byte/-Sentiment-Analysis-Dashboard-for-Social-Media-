import React from 'react';
import { 
  BarChart3, 
  MessageSquareText, 
  Share2, 
  PieChart, 
  FileText, 
  Settings, 
  X,
  Sparkles,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { SentimentTab } from '../../types/sentiment';

interface SidebarProps {
  currentTab: SentimentTab;
  onTabChange: (tab: SentimentTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: { id: SentimentTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'analyze_text', label: 'Analyze Text', icon: MessageSquareText, badge: 'Live NLP' },
    { id: 'social_posts', label: 'Social Posts', icon: Share2, badge: '12.4k' },
    { id: 'analytics', label: 'Sentiment Analytics', icon: PieChart },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Lockup */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-slate-950">
              <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-none">
                Sentilytics
              </span>
              <span className="text-[11px] font-medium text-emerald-400 block mt-1 tracking-wide">
                Social Media Intelligence
              </span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Tracking Monitor Pill */}
        <div className="p-3 border-b border-slate-800/60">
          <div className="px-3 py-2 rounded-lg bg-slate-850 bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-200">
                Active Crawl Stream
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
              LIVE
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Navigation
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-emerald-700/90 text-white'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Social Platforms Coverage Meter */}
        <div className="p-3 mx-3 mb-3 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Platform Channels</span>
            <span className="font-mono text-emerald-400 text-[11px]">3 Connected</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Twitter</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Instagram</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Facebook</span>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono text-xs font-bold text-emerald-300 shrink-0">
              SL
            </div>
            <div className="truncate flex-1">
              <span className="text-xs font-semibold text-slate-200 block truncate">
                Social Analyst
              </span>
              <span className="text-[11px] text-slate-400 block truncate">
                Sentilytics Intelligence
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
