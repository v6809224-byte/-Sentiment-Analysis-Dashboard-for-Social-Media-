import React, { useState } from 'react';
import { SocialPost } from '../../types/sentiment';
import { RecentSocialPostsTable } from '../dashboard/RecentSocialPostsTable';
import { Share2, MessageSquare, Heart, Bookmark, ExternalLink } from 'lucide-react';

interface SocialPostsViewProps {
  posts: SocialPost[];
  onSelectPost?: (post: SocialPost) => void;
  onExportPosts?: (posts: SocialPost[]) => void;
}

export const SocialPostsView: React.FC<SocialPostsViewProps> = ({
  posts,
  onSelectPost,
  onExportPosts,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Total Ingested Social Posts
          </span>
          <span className="text-2xl font-bold font-mono text-white tabular-nums">
            {posts.length.toLocaleString()} Feed Items
          </span>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
            100% analyzed with sentiment confidence
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Average Classification Confidence
          </span>
          <span className="text-2xl font-bold font-mono text-white tabular-nums">
            92.8%
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Model threshold &gt;80%
          </span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 block mb-1">
            Dominant Platform Feed
          </span>
          <span className="text-2xl font-bold text-white">
            Instagram (43.5%)
          </span>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
            Highest positive sentiment ratio (62%)
          </span>
        </div>
      </div>

      {/* Main Table */}
      <RecentSocialPostsTable
        posts={posts}
        onSelectPost={onSelectPost}
        onExportPosts={onExportPosts}
      />
    </div>
  );
};
