export type SentimentTab = 
  | 'dashboard' 
  | 'analyze_text' 
  | 'social_posts' 
  | 'analytics' 
  | 'reports' 
  | 'settings';

export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export type SocialPlatform = 'Twitter' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'Reddit' | 'YouTube';

export type EmotionType = 'Joy' | 'Neutral' | 'Sadness' | 'Anger' | 'Fear' | 'Love';

export interface SocialPost {
  id: string;
  user: string;
  platform: SocialPlatform;
  post: string;
  sentiment: SentimentType;
  confidence: number; // e.g. 96
  date: string;
  likes?: number;
  comments?: number;
  shares?: number;
  emotion?: EmotionType;
}

export interface SentimentTrendDay {
  day: string; // 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  dateLabel: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}

export interface PlatformSentimentData {
  platform: SocialPlatform;
  positive: number; // percentage e.g. 62
  neutral: number;  // percentage e.g. 23
  negative: number; // percentage e.g. 15
  totalPosts: number;
}

export interface EmotionItem {
  name: EmotionType;
  percentage: number;
  color: string;
  description: string;
}

export interface KeywordItem {
  keyword: string;
  count: number;
  sentiment: SentimentType;
  trend: 'up' | 'stable' | 'down';
}

export interface TextAnalysisResult {
  text: string;
  sentiment: SentimentType;
  confidence: number;
  emotion: EmotionType;
  positiveIndicators: string[];
  negativeIndicators: string[];
  neutralIndicators: string[];
  explanation: string;
  summary: {
    positiveScore: number;
    neutralScore: number;
    negativeScore: number;
  };
}
