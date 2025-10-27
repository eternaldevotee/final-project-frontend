import { Component, Input, OnInit } from '@angular/core';


import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';

import { ReviewsService } from '../reviews.service';
import { Review } from '../../../core/models/ReviewModel';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
// export class ReviewListComponent implements OnInit {
//   @Input() packageId!: number;
//   reviews$!: Observable<Review[]>;

//   constructor(private reviewsService: ReviewsService) {}

//   ngOnInit(): void {
//     this.reviews$ = this.reviewsService.getReviewsForPackage(this.packageId);
//   }

//   trackById(index: number, item: Review): number {
//     return item.reviewId;
//   }
// }


export class ReviewListComponent implements OnInit {
  @Input() packageId!: string;

  /** raw source from service */
  reviews$!: Observable<Review[]>;

  counts$!: Observable<{ visible: number; total: number }>;

  /** reviews after applying rating filter */
  filteredReviews$!: Observable<Review[]>;

  /** current rating filter — null means 'All' */
  private ratingFilter$ = new BehaviorSubject<number | null>(null);

  constructor(private reviewsService: ReviewsService) {}

    
  ngOnInit(): void {
    this.reviews$ = this.reviewsService.getReviewsForPackage(this.packageId);

    // Combine source reviews with the selected filter
    this.filteredReviews$ = combineLatest([
      this.reviews$,
      this.ratingFilter$.pipe(startWith(null))
    ]).pipe(
      map(([reviews, rating]) =>
        rating == null ? reviews : reviews.filter(r => r.rating === rating)
      )
    );

    this.counts$ = combineLatest([this.filteredReviews$, this.reviews$]).pipe(
      map(([visible, total]) => ({ visible: visible.length, total: total.length }))
    );
  }

  trackById(index: number, item: Review): string {
    return item.reviewId;
  }

  /** UI helper to set filter (pass null for "All") */
  setRatingFilter(rating: number | null) {
    this.ratingFilter$.next(rating);
  }
}