import React, { useState, useMemo } from 'react';
import { SocialPost, SocialPlatform, SentimentType } from '../../types/sentiment';
import { 
  Search, 
  Filter, 
  Twitter, 
  Instagram, 
  Facebook, 
  Share2, 
  Smile, 
  Meh, 
  Frown,
  ArrowUpDown,
  Download
} from 'lucide-react';

interface RecentSocialPostsTableProps {
  posts: SocialPost[];
  searchQuery?: string;
  onSelectPost?: (post: SocialPost) => void;
  onExportPosts?: (posts: SocialPost[]) => void;
}

export const RecentSocialPostsTable: React.FC<RecentSocialPostsTableProps> = ({
  posts,
  searchQuery: initialSearch = '',
  onSelectPost,
  onExportPosts,
}) => {
  const [internalSearch, setInternalSearch] = useState(initialSearch);
  const [platformFilter, setPlatformFilter] = useState<'All' | SocialPlatform>('All');
  const [sentimentFilter, setSentimentFilter] = useState<'All' | SentimentType>('All');
  const [sortBy, setSortBy] = useState<'confidence' | 'date'>('confidence');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filter and sort
  const filteredPosts = useMemo(() => {
    return posts
      .filter((p) => {
        const query = internalSearch.toLowerCase();
        const matchesSearch =
          p.user.toLowerCase().includes(query) ||
          p.post.toLowerCase().includes(query) ||
          p.platform.toLowerCase().includes(query);
        const matchesPlatform = platformFilter === 'All' || p.platform === platformFilter;
        const matchesSentiment = sentimentFilter === 'All' || p.sentiment === sentimentFilter;
        return matchesSearch && matchesPlatform && matchesSentiment;
      })
      .sort((a, b) => {
        if (sortBy === 'confidence') {
          return sortOrder === 'desc' ? b.confidence - a.confidence : a.confidence - b.confidence;
        }
        return 0;
      });
  }, [posts, internalSearch, platformFilter, sentimentFilter, sortBy, sortOrder]);

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-3.5 h-3.5 text-sky-400" />;
      case 'Instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case 'Facebook':
        return <Facebook className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return <Share2 className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
            <Smile className="w-3.5 h-3.5 text-emerald-400" />
            Positive
          </span>
        );
      case 'Neutral':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950/60 border border-sky-500/40 text-sky-300">
            <Meh className="w-3.5 h-3.5 text-sky-300" />
            Neutral
          </span>
        );
      case 'Negative':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/60 border border-rose-500/40 text-rose-400">
            <Frown className="w-3.5 h-3.5 text-rose-400" />
            Negative
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between">
      {/* Header and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Recent Social Media Posts
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              {filteredPosts.length} posts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time social feeds analyzed with NLP sentiment polarity scoring
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search posts or @user..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Platforms</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Reddit">Reddit</option>
          </select>

          {/* Sentiment Filter */}
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>

          {/* Sort button */}
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            title="Sort by confidence score"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Conf {sortOrder === 'desc' ? 'High' : 'Low'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-mono text-[11px]">
              <th className="py-2.5 px-3 font-semibold">User</th>
              <th className="py-2.5 px-3 font-semibold">Platform</th>
              <th className="py-2.5 px-3 font-semibold">Post</th>
              <th className="py-2.5 px-3 font-semibold">Sentiment</th>
              <th className="py-2.5 px-3 font-semibold text-right">Confidence</th>
              <th className="py-2.5 px-3 font-semibold text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                onClick={() => onSelectPost?.(post)}
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                {/* User */}
                <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                  <span className="group-hover:text-emerald-400 transition-colors font-mono">
                    {post.user}
                  </span>
                </td>

                {/* Platform */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    {getPlatformIcon(post.platform)}
                    <span className="text-slate-300 font-medium">
                      {post.platform}
                    </span>
                  </div>
                </td>

                {/* Post Text */}
                <td className="py-3 px-3 max-w-md">
                  <p className="text-slate-200 leading-relaxed font-normal">
                    "{post.post}"
                  </p>
                </td>

                {/* Sentiment Badge */}
                <td className="py-3 px-3 whitespace-nowrap">
                  {getSentimentBadge(post.sentiment)}
                </td>

                {/* Confidence */}
                <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-white whitespace-nowrap">
                  {post.confidence}%
                </td>

                {/* Date */}
                <td className="py-3 px-3 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  {post.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="pt-4 border-t border-slate-800/60 mt-3 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="text-white font-mono">{filteredPosts.length}</span> social media entries
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Model: RoBERTa Social-V4 Fine-Tuned
        </div>
      </div>
    </div>
  );
};
