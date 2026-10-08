import { 
  SocialPost, 
  SentimentTrendDay, 
  PlatformSentimentData, 
  EmotionItem, 
  KeywordItem 
} from '../types/sentiment';

export interface TopStatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositiveChange: boolean;
  benchmark: string;
  sparkline: number[];
  type: 'total' | 'positive' | 'neutral' | 'negative';
}

export const mockTopStats: TopStatItem[] = [
  {
    id: 'total_posts',
    label: 'Total Posts Analyzed',
    value: '12,458',
    change: '+12.5% this week',
    isPositiveChange: true,
    benchmark: '+1,380 vs last week',
    sparkline: [9800, 10200, 10700, 11200, 11600, 12100, 12458],
    type: 'total',
  },
  {
    id: 'positive_sentiment',
    label: 'Positive Sentiment',
    value: '58.4%',
    change: '+4.2%',
    isPositiveChange: true,
    benchmark: 'Dominant sentiment',
    sparkline: [52, 53.5, 54.8, 56.1, 57.0, 57.9, 58.4],
    type: 'positive',
  },
  {
    id: 'neutral_sentiment',
    label: 'Neutral Sentiment',
    value: '24.7%',
    change: '+1.1%',
    isPositiveChange: true,
    benchmark: 'Informational & inquiries',
    sparkline: [26.2, 25.8, 25.4, 25.1, 24.9, 24.8, 24.7],
    type: 'neutral',
  },
  {
    id: 'negative_sentiment',
    label: 'Negative Sentiment',
    value: '16.9%',
    change: '-3.4%',
    isPositiveChange: true, // Lower negative sentiment is positive improvement!
    benchmark: 'Significant decline',
    sparkline: [21.8, 20.7, 19.8, 18.8, 18.1, 17.3, 16.9],
    type: 'negative',
  },
];

export const mockTrendDays: SentimentTrendDay[] = [
  { day: 'Mon', dateLabel: 'Sep 30', positive: 54, neutral: 26, negative: 20, total: 1620 },
  { day: 'Tue', dateLabel: 'Oct 01', positive: 56, neutral: 25, negative: 19, total: 1740 },
  { day: 'Wed', dateLabel: 'Oct 02', positive: 55, neutral: 27, negative: 18, total: 1810 },
  { day: 'Thu', dateLabel: 'Oct 03', positive: 58, neutral: 25, negative: 17, total: 1890 },
  { day: 'Fri', dateLabel: 'Oct 04', positive: 61, neutral: 23, negative: 16, total: 2050 },
  { day: 'Sat', dateLabel: 'Oct 05', positive: 63, neutral: 22, negative: 15, total: 2180 },
  { day: 'Sun', dateLabel: 'Oct 06', positive: 58.4, neutral: 24.7, negative: 16.9, total: 2268 },
];

export const mockEmotions: EmotionItem[] = [
  { name: 'Joy', percentage: 42, color: '#10b981', description: 'Celebratory, happy feedback & high delight' },
  { name: 'Neutral', percentage: 25, color: '#94a3b8', description: 'Matter-of-fact reviews & updates' },
  { name: 'Sadness', percentage: 12, color: '#6366f1', description: 'Disappointment & missed expectations' },
  { name: 'Anger', percentage: 9, color: '#ef4444', description: 'Frustration & aggressive critique' },
  { name: 'Fear', percentage: 7, color: '#f59e0b', description: 'Apprehension, bug anxiety & uncertainty' },
  { name: 'Love', percentage: 5, color: '#ec4899', description: 'Passionate brand adoration & loyalty' },
];

export const mockPlatformData: PlatformSentimentData[] = [
  { platform: 'Instagram', positive: 62, neutral: 23, negative: 15, totalPosts: 5420 },
  { platform: 'Twitter', positive: 51, neutral: 27, negative: 22, totalPosts: 4890 },
  { platform: 'Facebook', positive: 59, neutral: 26, negative: 15, totalPosts: 2148 },
];

export const mockKeywords: KeywordItem[] = [
  { keyword: 'great', count: 1842, sentiment: 'Positive', trend: 'up' },
  { keyword: 'love', count: 1420, sentiment: 'Positive', trend: 'up' },
  { keyword: 'amazing', count: 1210, sentiment: 'Positive', trend: 'up' },
  { keyword: 'excellent', count: 980, sentiment: 'Positive', trend: 'up' },
  { keyword: 'event', count: 860, sentiment: 'Neutral', trend: 'stable' },
  { keyword: 'service', count: 740, sentiment: 'Neutral', trend: 'stable' },
  { keyword: 'bad', count: 520, sentiment: 'Negative', trend: 'down' },
  { keyword: 'disappointed', count: 390, sentiment: 'Negative', trend: 'down' },
];

export const mockSocialPosts: SocialPost[] = [
  {
    id: 'post-1',
    user: '@alex',
    platform: 'Twitter',
    post: 'Absolutely loved the new campus event!',
    sentiment: 'Positive',
    confidence: 96,
    date: 'Today',
    likes: 142,
    comments: 18,
    emotion: 'Joy',
  },
  {
    id: 'post-2',
    user: '@rahul',
    platform: 'Instagram',
    post: 'The service was okay, nothing special.',
    sentiment: 'Neutral',
    confidence: 81,
    date: 'Today',
    likes: 64,
    comments: 5,
    emotion: 'Neutral',
  },
  {
    id: 'post-3',
    user: '@sarah',
    platform: 'Twitter',
    post: 'Very disappointed with the customer support.',
    sentiment: 'Negative',
    confidence: 94,
    date: 'Yesterday',
    likes: 88,
    comments: 29,
    emotion: 'Anger',
  },
  {
    id: 'post-4',
    user: '@john',
    platform: 'Facebook',
    post: 'Great experience! Will definitely recommend.',
    sentiment: 'Positive',
    confidence: 97,
    date: 'Yesterday',
    likes: 215,
    comments: 34,
    emotion: 'Joy',
  },
  {
    id: 'post-5',
    user: '@priya',
    platform: 'LinkedIn',
    post: 'Proud of our college team for organizing such an amazing tech symposium! Speakers were world-class.',
    sentiment: 'Positive',
    confidence: 98,
    date: 'Today',
    likes: 340,
    comments: 42,
    emotion: 'Joy',
  },
  {
    id: 'post-6',
    user: '@david',
    platform: 'Twitter',
    post: 'The mobile app keeps crashing during checkout. Terrible update and zero response.',
    sentiment: 'Negative',
    confidence: 92,
    date: 'Yesterday',
    likes: 52,
    comments: 14,
    emotion: 'Anger',
  },
  {
    id: 'post-7',
    user: '@ananya',
    platform: 'Instagram',
    post: 'Attended the cultural fest today. Food stalls were decent, stage was crowded.',
    sentiment: 'Neutral',
    confidence: 79,
    date: '2 days ago',
    likes: 120,
    comments: 8,
    emotion: 'Neutral',
  },
  {
    id: 'post-8',
    user: '@mark',
    platform: 'Reddit',
    post: 'Honest review of the new library facility: quiet study areas are fantastic, wifi is slightly patchy.',
    sentiment: 'Neutral',
    confidence: 84,
    date: '2 days ago',
    likes: 95,
    comments: 31,
    emotion: 'Neutral',
  },
  {
    id: 'post-9',
    user: '@emily',
    platform: 'Facebook',
    post: 'Big thank you to the coordinators! Had so much fun with friends and loved the music lineup.',
    sentiment: 'Positive',
    confidence: 95,
    date: '3 days ago',
    likes: 182,
    comments: 22,
    emotion: 'Love',
  },
  {
    id: 'post-10',
    user: '@vikram',
    platform: 'Twitter',
    post: 'Waste of money on tickets. The sound system failed halfway through and ruined the show.',
    sentiment: 'Negative',
    confidence: 96,
    date: '3 days ago',
    likes: 110,
    comments: 45,
    emotion: 'Anger',
  },
];
