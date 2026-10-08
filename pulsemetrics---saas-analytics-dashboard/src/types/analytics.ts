export type TimeRange = '7d' | '30d' | '90d' | '12m';

export type NavigationTab = 
  | 'overview' 
  | 'revenue' 
  | 'customers' 
  | 'usage' 
  | 'retention' 
  | 'settings';

export interface KPIItem {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  benchmark: string;
  sparkline: number[];
  category: 'financial' | 'growth' | 'efficiency' | 'risk';
  description: string;
}

export interface RevenueTimeSeriesPoint {
  date: string;
  label: string;
  totalMrr: number;
  newMrr: number;
  expansionMrr: number;
  churnMrr: number;
  netNewMrr: number;
  activeAccounts: number;
  apiCallsK: number;
}

export interface AcquisitionChannel {
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenueGenerated: number;
  color: string;
  sharePercentage: number;
}

export interface CohortRow {
  cohort: string;
  initialSize: number;
  retention: number[]; // e.g. [100, 88, 82, 79, 76, 74]
}

export type PlanType = 'Starter' | 'Pro' | 'Enterprise';
export type CustomerStatus = 'active' | 'trial' | 'at_risk' | 'churned';

export interface CustomerItem {
  id: string;
  name: string;
  company: string;
  email: string;
  avatarUrl?: string;
  plan: PlanType;
  status: CustomerStatus;
  mrr: number;
  healthScore: number; // 0-100
  joinedDate: string;
  lastActive: string;
  renewalDate: string;
  seatsUsed: number;
  totalSeats: number;
  apiUsagePercent: number;
  region: string;
}

export type ActivityEventType = 
  | 'subscription_upgraded' 
  | 'payment_succeeded' 
  | 'churn_risk_flagged' 
  | 'new_team_added' 
  | 'api_limit_warning';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  description: string;
  customerName: string;
  customerId: string;
  amount?: number;
  timestamp: string;
  relativeTime: string;
  severity: 'info' | 'success' | 'warning' | 'critical';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Finance' | 'Developer';
  status: 'active' | 'invited';
  lastLogin: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: 'healthy' | 'failing';
  lastDelivery: string;
}
