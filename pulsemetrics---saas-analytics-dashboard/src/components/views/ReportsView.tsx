import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Share2, 
  Smile, 
  Meh, 
  Frown 
} from 'lucide-react';

interface ReportsViewProps {
  onExportCsv?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onExportCsv }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadReport = () => {
    onExportCsv?.();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Report Header Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Weekly Social Sentiment Intelligence Report
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generated on October 06, 2026 · Window: Past 7 Days · Coverage: Twitter, Instagram, Facebook
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloaded ? 'Downloaded' : 'Export Full Report'}</span>
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
            1. Executive Summary
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            During the trailing 7-day observation cycle, public conversation achieved a predominantly favorable posture, with <strong className="text-emerald-400 font-semibold">58.4% positive sentiment</strong> and a notable <strong className="text-emerald-400 font-semibold">3.4% reduction in negative sentiment</strong>. Joy emerged as the preeminent affective state (42%), energized by campus activities and community engagement programs.
          </p>
        </div>

        {/* Key Metrics Matrix */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono mb-3">
            2. Aggregate Sentiment Breakdown
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium block">Positive Volume</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                58.4% (7,275 posts)
              </span>
              <span className="text-xs text-emerald-300 font-mono mt-0.5 block">
                +4.2% week-over-week
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium block">Neutral Volume</span>
              <span className="text-2xl font-bold font-mono text-sky-300 mt-1 block">
                24.7% (3,077 posts)
              </span>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                Information & questions
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium block">Negative Volume</span>
              <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block">
                16.9% (2,106 posts)
              </span>
              <span className="text-xs text-emerald-400 font-mono mt-0.5 block">
                -3.4% healthy drop
              </span>
            </div>
          </div>
        </div>

        {/* Platform Insights */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
            3. Platform Comparison Highlights
          </h3>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-white">Instagram:</strong> Highest satisfaction rating at 62% positive sentiment, heavily driven by visual photo sharing from cultural fest events.
            </li>
            <li>
              <strong className="text-white">Twitter:</strong> Carried the highest density of negative critique (22%), primarily focused on audio equipment complaints during the evening show.
            </li>
            <li>
              <strong className="text-white">Facebook:</strong> Stable community feedback with 59% positive sentiment and strong peer recommendations.
            </li>
          </ul>
        </div>

        {/* Actionable Recommendations */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono mb-1">
            Actionable Strategic Recommendations
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            1. Amplify Instagram user-generated content by reposting top attendee photos.<br />
            2. Proactively address Twitter customer support complaints regarding sound system delays to prevent negative sentiment propagation.
          </p>
        </div>
      </div>
    </div>
  );
};
