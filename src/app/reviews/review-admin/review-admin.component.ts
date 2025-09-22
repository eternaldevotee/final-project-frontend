import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review-admin', // Changed selector
  standalone: false,
  templateUrl: './review-admin.component.html', // Renamed file
  styleUrls: ['./review-admin.component.css'] // Renamed file
})
export class ReviewAdminComponent implements OnInit { // Renamed class
  pending$!: Observable<Review[]>;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.pending$ = this.reviewsService.getPendingReviews();
  }

  publish(reviewId: number): void {
    this.reviewsService.moderateReview(reviewId, true).subscribe();
  }

  reject(reviewId: number): void {
    this.reviewsService.moderateReview(reviewId, false).subscribe();
  }

  // The 'respond' method has been removed from this component.
}