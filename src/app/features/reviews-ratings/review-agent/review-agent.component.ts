// import { Component, OnInit } from '@angular/core';
// import { ReviewsService } from '../reviews.service';
// import { Review } from '../review.model';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-review-agent',
//   standalone:false,
//   templateUrl: './review-agent.component.html',
//   styleUrls: ['./review-agent.component.css']
// })
// export class ReviewAgentComponent implements OnInit {
//   pending$!: Observable<Review[]>;

//   constructor(private reviewsService: ReviewsService) {}

//   ngOnInit(): void {
//     this.pending$ = this.reviewsService.getPendingReviews();
//   }

//   publish(reviewId: number): void {
//     this.reviewsService.moderateReview(reviewId, true).subscribe();
//   }

//   reject(reviewId: number): void {
//     this.reviewsService.moderateReview(reviewId, false).subscribe();
//   }

//   respond(review: Review, responseText: string, responseInput: HTMLTextAreaElement): void {
//     if (!responseText?.trim()) {
//       alert('Response cannot be empty.');
//       return;
//     }
//     this.reviewsService.respondToReview(review.reviewId, responseText).subscribe(() => {
//         // Optionally clear the textarea after responding
//         responseInput.value = '';
//     });
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../../../core/models/ReviewModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review-agent',
  standalone: false,
  templateUrl: './review-agent.component.html',
  styleUrls: ['./review-agent.component.css']
})
export class ReviewAgentComponent implements OnInit {
  @Input() packageId!: number;
  published$!: Observable<Review[]>;

  constructor(private reviewsService: ReviewsService) {}

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