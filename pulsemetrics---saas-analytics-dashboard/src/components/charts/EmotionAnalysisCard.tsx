import React, { useState } from 'react';
import { Sparkles, Heart, Smile, Meh, Frown, Flame, AlertCircle } from 'lucide-react';
import { mockEmotions } from '../../data/mockSentiment';

export const EmotionAnalysisCard: React.FC = () => {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const getEmotionIcon = (name: string) => {
    switch (name) {
      case 'Joy':
        return <Smile className="w-4 h-4 text-emerald-400" />;
      case 'Neutral':
        return <Meh className="w-4 h-4 text-slate-300" />;
      case 'Sadness':
        return <Frown className="w-4 h-4 text-indigo-400" />;
      case 'Anger':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'Fear':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'Love':
        return <Heart className="w-4 h-4 text-pink-400 fill-pink-400/20" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Emotion Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Fine-grained affective classification of audience reactions
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          Joy Leads (42%)
        </span>
      </div>

      {/* Emotion Bars */}
      <div className="space-y-3 flex-1 justify-center flex flex-col">
        {mockEmotions.map((emotion) => {
          const isHovered = hoveredEmotion === emotion.name;

          return (
            <div
              key={emotion.name}
              onMouseEnter={() => setHoveredEmotion(emotion.name)}
              onMouseLeave={() => setHoveredEmotion(null)}
              className={`p-2 rounded-lg transition-all ${
                isHovered ? 'bg-slate-800/80' : 'hover:bg-slate-850/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="shrink-0">{getEmotionIcon(emotion.name)}</span>
                  <span className="font-semibold text-slate-200">
                    {emotion.name}
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    · {emotion.description}
                  </span>
                </div>
                <span className="font-mono font-bold text-white tabular-nums">
                  {emotion.percentage}%
                </span>
              </div>

              {/* Attractive Progress Bar */}
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${emotion.percentage}%`,
                    backgroundColor: emotion.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
