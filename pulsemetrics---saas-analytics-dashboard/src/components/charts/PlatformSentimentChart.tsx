import React, { useState } from 'react';
import { Share2, Instagram, Twitter, Facebook } from 'lucide-react';
import { mockPlatformData } from '../../data/mockSentiment';
import { SocialPlatform } from '../../types/sentiment';

export const PlatformSentimentChart: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform | null>(null);

  const getPlatformIcon = (name: SocialPlatform) => {
    switch (name) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-500" />;
      default:
        return <Share2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60 mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Sentiment by Platform
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-platform sentiment breakdown across Instagram, Twitter, and Facebook
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="text-slate-300">Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-300">Negative</span>
          </div>
        </div>
      </div>

      {/* Platform Comparison Bars */}
      <div className="space-y-6">
        {mockPlatformData.map((item) => {
          const isSelected = activePlatform === item.platform;

          return (
            <div
              key={item.platform}
              onMouseEnter={() => setActivePlatform(item.platform)}
              onMouseLeave={() => setActivePlatform(null)}
              className={`p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-slate-850 border-slate-700 shadow-md'
                  : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-850/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700">
                    {getPlatformIcon(item.platform)}
                  </div>
                  <span className="font-bold text-sm text-white">
                    {item.platform}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({item.totalPosts.toLocaleString()} posts)
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-emerald-400 font-semibold">
                    {item.positive}% Pos
                  </span>
                  <span className="text-sky-400 font-medium">
                    {item.neutral}% Neu
                  </span>
                  <span className="text-rose-400 font-medium">
                    {item.negative}% Neg
                  </span>
                </div>
              </div>

              {/* Stacked Sentiment Bar */}
              <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500 hover:brightness-110 flex items-center justify-center text-[10px] font-bold text-slate-950"
                  style={{ width: `${item.positive}%` }}
                  title={`${item.platform} Positive: ${item.positive}%`}
                >
                  {item.positive > 20 && `${item.positive}%`}
                </div>
                <div
                  className="bg-sky-400 h-full transition-all duration-500 hover:brightness-110 flex items-center justify-center text-[10px] font-bold text-slate-950"
                  style={{ width: `${item.neutral}%` }}
                  title={`${item.platform} Neutral: ${item.neutral}%`}
                >
                  {item.neutral > 15 && `${item.neutral}%`}
                </div>
                <div
                  className="bg-rose-500 h-full transition-all duration-500 hover:brightness-110 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${item.negative}%` }}
                  title={`${item.platform} Negative: ${item.negative}%`}
                >
                  {item.negative > 12 && `${item.negative}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
