
export enum CampaignStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Sending = 'Sending',
  Sent = 'Sent',
}

export interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: CampaignStatus;
  sentCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledFor?: string;
  audience: string;
  type?: 'Regular' | 'Autoresponder';
}

export interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'Subscribed' | 'Unsubscribed' | 'Bounced';
  tags: string[];
  joinedAt: string;
  listId?: string;
}

export interface SubscriberList {
  id: string;
  name: string;
  subscriberCount: number;
  description: string;
  createdAt: string;
}

export interface AnalyticsData {
  date: string;
  opens: number;
  clicks: number;
  sends: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  updatedAt: string;
  blocks?: EmailBlock[]; // JSON structure for the builder
  html?: string;         // Compiled HTML for sending/preview
}

export interface DeliveryServer {
  id: string;
  name: string;
  type: 'SMTP' | 'Amazon SES' | 'Mailgun' | 'SendGrid' | 'PHP Mail';
  host?: string;
  username?: string;
  status: 'Active' | 'Inactive';
  hourlyQuota: number;
  currentUsage: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'Inactive';
  quotaUsed: number;
  quotaLimit: number;
  joinedAt: string;
}

export interface SendingDomain {
  id: string;
  domain: string;
  spfStatus: 'Verified' | 'Missing';
  dkimStatus: 'Verified' | 'Missing';
  dmarcStatus: 'Verified' | 'Missing';
  status: 'Active' | 'Pending Verification';
  createdAt: string;
}

// --- Auth Types ---

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatar?: string;
}

// --- Email Builder Types ---

export interface BlockContent {
  text?: string;
  src?: string;
  alt?: string;
  label?: string;
  url?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  backgroundColor?: string;
  color?: string;
  html?: string;
}

export interface EmailBlock {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'social' | 'html';
  content: BlockContent;
}