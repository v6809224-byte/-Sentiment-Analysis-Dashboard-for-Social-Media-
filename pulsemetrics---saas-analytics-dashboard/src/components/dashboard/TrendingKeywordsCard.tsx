import React from 'react';
import { Tag, TrendingUp, Sparkles } from 'lucide-react';
import { mockKeywords } from '../../data/mockSentiment';
import { KeywordItem } from '../../types/sentiment';

interface TrendingKeywordsCardProps {
  onSelectKeyword?: (keyword: string) => void;
  activeKeyword?: string;
}

export const TrendingKeywordsCard: React.FC<TrendingKeywordsCardProps> = ({
  onSelectKeyword,
  activeKeyword,
}) => {
  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Trending Keywords
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Top 8 Tokens
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Most frequent semantic keywords extracted from social chatter. Click any keyword to filter.
      </p>

      {/* Attractive Keyword Chips */}
      <div className="flex flex-wrap gap-2.5">
        {mockKeywords.map((kw: KeywordItem) => {
          const isSelected = activeKeyword === kw.keyword;

          let badgeStyles = 'border-slate-700 bg-slate-800 text-slate-300';
          let countStyles = 'text-slate-400';

          if (kw.sentiment === 'Positive') {
            badgeStyles = isSelected
              ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
              : 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-500/50';
            countStyles = isSelected ? 'text-emerald-100' : 'text-emerald-400';
          } else if (kw.sentiment === 'Negative') {
            badgeStyles = isSelected
              ? 'border-rose-500 bg-rose-600 text-white shadow-md'
              : 'border-rose-500/30 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 hover:border-rose-500/50';
            countStyles = isSelected ? 'text-rose-100' : 'text-rose-400';
          } else {
            badgeStyles = isSelected
              ? 'border-sky-500 bg-sky-600 text-white shadow-md'
              : 'border-sky-500/30 bg-sky-950/40 text-sky-300 hover:bg-sky-900/50 hover:border-sky-500/50';
            countStyles = isSelected ? 'text-sky-100' : 'text-sky-400';
          }

          return (
            <button
              key={kw.keyword}
              onClick={() => onSelectKeyword?.(kw.keyword)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${badgeStyles} cursor-pointer`}
            >
              <span>#{kw.keyword}</span>
              <span className={`font-mono text-[11px] ${countStyles}`}>
                {kw.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Positive tokens lead by 3.2x</span>
        <span className="text-emerald-400">TF-IDF Vectorized</span>
      </div>
    </div>
  );
};
