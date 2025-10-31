import { ReviewStatus } from "./enums/ReviewStatus";

export interface Review {
  reviewId: string;
  userId: string;
  userName: string;
  packageId: string;
  rating: number; // 1..5
  comment: string;
  timestamp: string; // ISO format
  status: ReviewStatus;
  agentResponse?: string;
}