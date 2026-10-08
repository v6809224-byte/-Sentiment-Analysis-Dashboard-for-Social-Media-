import React from 'react';
import { SocialPost } from '../../types/sentiment';
import { 
  X, 
  Smile, 
  Meh, 
  Frown, 
  Twitter, 
  Instagram, 
  Facebook, 
  Share2, 
  Heart, 
  MessageCircle, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

interface PostDetailModalProps {
  post: SocialPost | null;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-4 h-4 text-sky-400" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-500" />;
      default:
        return <Share2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-emerald-400 text-sm">
              {post.user.replace('@', '').substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{post.user}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  via {getPlatformIcon(post.platform)} {post.platform}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{post.date}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <p className="text-base text-slate-100 leading-relaxed">
              "{post.post}"
            </p>
          </div>

          {/* Classification Specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1">Sentiment Polarity</span>
              <span className={`text-base font-bold ${
                post.sentiment === 'Positive'
                  ? 'text-emerald-400'
                  : post.sentiment === 'Negative'
                  ? 'text-rose-400'
                  : 'text-sky-300'
              }`}>
                {post.sentiment}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-slate-400 font-mono block mb-1">Model Confidence</span>
              <span className="text-base font-bold font-mono text-white">
                {post.confidence}%
              </span>
            </div>
          </div>

          {/* Social Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                {post.likes || 12} Likes
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                {post.comments || 3} Comments
              </span>
            </div>

            <span className="text-emerald-400">Verified Post</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-medium text-white transition-colors"
          >
            Close Post
          </button>
        </div>
      </div>
    </div>
  );
};
