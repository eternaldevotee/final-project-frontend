import { Component, OnInit } from '@angular/core';
import { Review } from '../../../core/models/ReviewModel';
import { Observable } from 'rxjs';
import { ReviewsService } from '../../../core/services/reviews/reviews.service';

@Component({
  selector: 'app-review-admin',
  standalone: false,
  templateUrl: './review-admin.component.html',
  styleUrls: ['./review-admin.component.css']
})
export class ReviewAdminComponent implements OnInit {
  pending$!: Observable<Review[]>;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.pending$ = this.reviewsService.getPendingReviews();
  }

  publish(reviewId: string): void {
    this.reviewsService.moderateReview(reviewId, true).subscribe();
  }

  reject(reviewId: string): void {
    this.reviewsService.moderateReview(reviewId, false).subscribe();
  }

}