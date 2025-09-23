export type ReviewStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED';

export interface Review {
  reviewId: number;
  userId: number;
  packageId: number;
  rating: number; // 1..5
  comment: string;
  timestamp: string; // ISO format
  status: ReviewStatus;
  agentResponse?: string;
}