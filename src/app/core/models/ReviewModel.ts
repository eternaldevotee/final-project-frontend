import { ReviewStatus } from "./enums/ReviewStatus";

export interface Review {
  reviewId: string;
  userId: string;
  userName: string;
  packageId: string;
  rating: number;
  comment: string;
  timestamp: string;
  status: ReviewStatus;
  agentResponse?: string;
}



export interface ReviewEligibility {
  eligible: boolean;
}