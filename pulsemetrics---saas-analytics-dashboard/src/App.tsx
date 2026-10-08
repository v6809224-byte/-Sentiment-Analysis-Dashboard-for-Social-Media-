/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TopStatsGrid } from './components/dashboard/TopStatsGrid';
import { SentimentTrendsChart } from './components/charts/SentimentTrendsChart';
import { SentimentDistributionDonut } from './components/charts/SentimentDistributionDonut';
import { EmotionAnalysisCard } from './components/charts/EmotionAnalysisCard';
import { PlatformSentimentChart } from './components/charts/PlatformSentimentChart';
import { TrendingKeywordsCard } from './components/dashboard/TrendingKeywordsCard';
import { RecentSocialPostsTable } from './components/dashboard/RecentSocialPostsTable';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { AnalyzeTextView } from './components/views/AnalyzeTextView';
import { SocialPostsView } from './components/views/SocialPostsView';
import { SentimentAnalyticsView } from './components/views/SentimentAnalyticsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

import { 
  mockTopStats, 
  mockTrendDays, 
  mockSocialPosts 
} from './data/mockSentiment';
import { SentimentTab, SocialPost } from './types/sentiment';

export default function App() {
  const [currentTab, setCurrentTab] = useState<SentimentTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [activeKeywordFilter, setActiveKeywordFilter] = useState<string | undefined>(undefined);

  // Posts state (allows new posts from "Analyze Text" to be appended)
  const [posts, setPosts] = useState<SocialPost[]>(mockSocialPosts);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const handleAddPost = (newPost: SocialPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleSelectKeyword = (keyword: string) => {
    if (activeKeywordFilter === keyword) {
      setActiveKeywordFilter(undefined);
      setSearchQuery('');
    } else {
      setActiveKeywordFilter(keyword);
      setSearchQuery(keyword);
    }
  };

  // CSV Export utility
  const handleExportCsv = (customPosts?: SocialPost[]) => {
    const dataToExport = customPosts || posts;
    const headers = ['User', 'Platform', 'Post Content', 'Sentiment', 'Confidence', 'Date'];
    const rows = dataToExport.map((p) => [
      `"${p.user}"`,
      `"${p.platform}"`,
      `"${p.post.replace(/"/g, '""')}"`,
      `"${p.sentiment}"`,
      `"${p.confidence}%"`,
      `"${p.date}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `sentilytics_social_sentiment_report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar: Sentilytics - Social Media Intelligence */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header: Title, Search, Notifications, Date filter, Export */}
        <Header
          currentTab={currentTab}
          onOpenMobile={() => setMobileSidebarOpen(true)}
          onExport={() => handleExportCsv()}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        {/* Viewport Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* TAB 1: MAIN DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              {/* TOP STATISTICS: Total Posts, Positive, Neutral, Negative */}
              <TopStatsGrid stats={mockTopStats} />

              {/* MAIN SECTION: Sentiment Trends 7-Day Chart */}
              <SentimentTrendsChart data={mockTrendDays} />

              {/* SECOND SECTION: Sentiment Distribution Donut & Emotion Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <SentimentDistributionDonut />
                </div>
                <div className="lg:col-span-6">
                  <EmotionAnalysisCard />
                </div>
              </div>

              {/* PLATFORM ANALYTICS & TRENDING KEYWORDS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <PlatformSentimentChart />
                </div>
                <div className="lg:col-span-5">
                  <TrendingKeywordsCard
                    onSelectKeyword={handleSelectKeyword}
                    activeKeyword={activeKeywordFilter}
                  />
                </div>
              </div>

              {/* THIRD SECTION: Recent Social Media Posts Table */}
              <RecentSocialPostsTable
                posts={posts}
                searchQuery={searchQuery}
                onSelectPost={setSelectedPost}
                onExportPosts={handleExportCsv}
              />
            </div>
          )}

          {/* TAB 2: ANALYZE TEXT (Live NLP Analysis Page) */}
          {currentTab === 'analyze_text' && (
            <AnalyzeTextView onAddPost={handleAddPost} />
          )}

          {/* TAB 3: SOCIAL POSTS */}
          {currentTab === 'social_posts' && (
            <SocialPostsView
              posts={posts}
              onSelectPost={setSelectedPost}
              onExportPosts={handleExportCsv}
            />
          )}

          {/* TAB 4: SENTIMENT ANALYTICS */}
          {currentTab === 'analytics' && <SentimentAnalyticsView />}

          {/* TAB 5: REPORTS */}
          {currentTab === 'reports' && (
            <ReportsView onExportCsv={() => handleExportCsv()} />
          )}

          {/* TAB 6: SETTINGS */}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Post Detail Inspection Modal */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
