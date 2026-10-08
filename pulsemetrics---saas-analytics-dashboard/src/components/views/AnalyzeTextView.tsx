import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Smile, 
  Meh, 
  Frown, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  Flame, 
  Layers,
  RotateCw,
  Plus
} from 'lucide-react';
import { analyzeSocialText } from '../../utils/sentimentAnalyzer';
import { TextAnalysisResult, SocialPost } from '../../types/sentiment';

interface AnalyzeTextViewProps {
  onAddPost?: (post: SocialPost) => void;
}

export const AnalyzeTextView: React.FC<AnalyzeTextViewProps> = ({ onAddPost }) => {
  const [inputText, setInputText] = useState('Absolutely loved the new campus event! Everything was so well organized and the guest speaker was amazing.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TextAnalysisResult | null>(() =>
    analyzeSocialText('Absolutely loved the new campus event! Everything was so well organized and the guest speaker was amazing.')
  );
  const [addedToast, setAddedToast] = useState(false);

  const samplePresets = [
    {
      label: 'Positive Event',
      text: 'Absolutely loved the new campus event! Everything was so well organized and the guest speaker was amazing.',
    },
    {
      label: 'Neutral Feedback',
      text: 'The service was okay, nothing special. The food arrived on time but the venue was quite crowded.',
    },
    {
      label: 'Negative Complaint',
      text: 'Very disappointed with the customer support. Terrible delay, broken tickets, and completely unhelpful staff.',
    },
    {
      label: 'High Recommendation',
      text: 'Great experience! Will definitely recommend to everyone in our department. Super clean and fun!',
    },
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeSocialText(inputText);
      setResult(res);
      setIsAnalyzing(false);
    }, 250);
  };

  const handleAddToFeed = () => {
    if (!result) return;
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      user: '@guest_tester',
      platform: 'Twitter',
      post: result.text,
      sentiment: result.sentiment,
      confidence: result.confidence,
      date: 'Just now',
      likes: 1,
      comments: 0,
      emotion: result.emotion,
    };
    onAddPost?.(newPost);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <Smile className="w-6 h-6 text-emerald-400" />;
      case 'Negative':
        return <Frown className="w-6 h-6 text-rose-400" />;
      default:
        return <Meh className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Analyze a Social Media Post
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Enter any comment, tweet, or social update below to calculate real-time polarity sentiment, confidence scores, and affective emotion indicators.
        </p>

        {/* Preset Sample Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/60">
          <span className="text-[11px] font-mono text-slate-400 block mb-2">
            Try Demo Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setInputText(preset.text);
                  const res = analyzeSocialText(preset.text);
                  setResult(res);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-xs text-slate-300 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea Input */}
        <div className="mt-4">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a social media post or comment..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
          />
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>{inputText.length} characters</span>
            <span>Natural Language Processing Model: VADER + RoBERTa</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => {
              setInputText('');
              setResult(null);
            }}
            className="text-xs text-slate-400 hover:text-white"
          >
            Clear Text
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Syntax...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Section */}
      {result && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Classification Report
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Computed sentiment scores and contextual emotion inference
              </p>
            </div>

            <button
              onClick={handleAddToFeed}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{addedToast ? 'Added to Feed!' : 'Add to Social Posts'}</span>
            </button>
          </div>

          {/* Key Classification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Sentiment */}
            <div className={`p-5 rounded-xl border flex items-center gap-4 ${
              result.sentiment === 'Positive'
                ? 'bg-emerald-950/40 border-emerald-500/40'
                : result.sentiment === 'Negative'
                ? 'bg-rose-950/40 border-rose-500/40'
                : 'bg-sky-950/40 border-sky-500/40'
            }`}>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                {getSentimentIcon(result.sentiment)}
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Sentiment
                </span>
                <span className={`text-xl font-bold tracking-tight ${
                  result.sentiment === 'Positive'
                    ? 'text-emerald-400'
                    : result.sentiment === 'Negative'
                    ? 'text-rose-400'
                    : 'text-sky-300'
                }`}>
                  {result.sentiment.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Confidence */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Confidence
                </span>
                <span className="text-2xl font-bold font-mono text-white tabular-nums">
                  {result.confidence}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Probability weight
                </span>
              </div>
            </div>

            {/* Emotion */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Primary Emotion
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  {result.emotion}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Affective state
                </span>
              </div>
            </div>
          </div>

          {/* Indicators Section */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Lexical Indicators Detected:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.positiveIndicators.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-emerald-400 font-mono">Positive:</span>
                    {result.positiveIndicators.map((word) => (
                      <span
                        key={word}
                        className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono"
                      >
                        +{word}
                      </span>
                    ))}
                  </div>
                )}

                {result.negativeIndicators.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap ml-2">
                    <span className="text-xs text-rose-400 font-mono">Negative:</span>
                    {result.negativeIndicators.map((word) => (
                      <span
                        key={word}
                        className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono"
                      >
                        -{word}
                      </span>
                    ))}
                  </div>
                )}

                {result.positiveIndicators.length === 0 && result.negativeIndicators.length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    Neutral vocabulary profile detected. No polar emotional trigger tokens.
                  </span>
                )}
              </div>
            </div>

            {/* Explanation Prose */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">NLP Summary: </span>
              {result.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
