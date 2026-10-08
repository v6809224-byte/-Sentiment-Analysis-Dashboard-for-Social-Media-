import React, { useState } from 'react';
import { 
  Settings, 
  Share2, 
  Sliders, 
  Bell, 
  Twitter, 
  Instagram, 
  Facebook, 
  Check, 
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [positiveThreshold, setPositiveThreshold] = useState(60);
  const [negativeThreshold, setNegativeThreshold] = useState(40);
  const [savedToast, setSavedToast] = useState(false);

  const [connectedPlatforms, setConnectedPlatforms] = useState({
    twitter: true,
    instagram: true,
    facebook: true,
  });

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {savedToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Sentiment configuration preferences successfully updated.
          </span>
          <button onClick={() => setSavedToast(false)} className="text-slate-400 hover:text-white">
            ×
          </button>
        </div>
      )}

      {/* Model Calibration */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Sentiment Calibration & Thresholds
          </h3>
        </div>

        <p className="text-xs text-slate-400">
          Adjust the confidence cutoffs required to classify social media text as distinctly Positive or Negative.
        </p>

        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-slate-300">Positive Polarity Threshold:</span>
              <span className="text-emerald-400 font-bold">{positiveThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="90"
              value={positiveThreshold}
              onChange={(e) => setPositiveThreshold(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500">
              Posts scoring above {positiveThreshold}% are marked Positive.
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-slate-300">Negative Polarity Sensitivity:</span>
              <span className="text-rose-400 font-bold">{negativeThreshold}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={negativeThreshold}
              onChange={(e) => setNegativeThreshold(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500">
              Posts with negative polarity weights exceeding {negativeThreshold}% trigger alerts.
            </span>
          </div>
        </div>
      </div>

      {/* Social Platform Feeds */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Connected Social Media Feeds
          </h3>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-950/50 text-sky-400 border border-sky-800/50">
                <Twitter className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Twitter / X Stream</span>
                <span className="text-xs text-slate-400">Stream status: Ingesting #CampusFest2026, @brand tags</span>
              </div>
            </div>
            <button
              onClick={() => setConnectedPlatforms((p) => ({ ...p, twitter: !p.twitter }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                connectedPlatforms.twitter
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {connectedPlatforms.twitter ? 'Connected' : 'Paused'}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-950/50 text-pink-400 border border-pink-800/50">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Instagram Graph API</span>
                <span className="text-xs text-slate-400">Public mentions, hashtag reels, story reactions</span>
              </div>
            </div>
            <button
              onClick={() => setConnectedPlatforms((p) => ({ ...p, instagram: !p.instagram }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                connectedPlatforms.instagram
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {connectedPlatforms.instagram ? 'Connected' : 'Paused'}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-950/50 text-blue-400 border border-blue-800/50">
                <Facebook className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Facebook Community Page</span>
                <span className="text-xs text-slate-400">Public group reviews, wall comments, shared links</span>
              </div>
            </div>
            <button
              onClick={() => setConnectedPlatforms((p) => ({ ...p, facebook: !p.facebook }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                connectedPlatforms.facebook
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {connectedPlatforms.facebook ? 'Connected' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};
