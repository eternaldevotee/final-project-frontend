
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../core/models/ReviewModel';
import { Observable } from 'rxjs';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';

@Component({
  selector: 'app-review-agent',
  standalone: false,
  templateUrl: './review-agent.component.html',
  styleUrls: ['./review-agent.component.css']
})
export class ReviewAgentComponent implements OnInit {
  @Input() packageId!: string;
  published$!: Observable<Review[]>;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    // Agent fetches PUBLISHED reviews for their assigned package
    this.published$ = this.reviewsService.getReviewsForPackage(this.packageId);
  }



  respond(review: Review, responseText: string): void {
    if (!responseText?.trim()) {
      alert('Response cannot be empty.');
      return;
    }
    this.reviewsService.respondToReview(review.reviewId, responseText).subscribe();
  }
}