import { Component, Input, OnInit } from '@angular/core';


import { Observable } from 'rxjs';

import { ReviewsService } from '../reviews.service';
import { Review } from '../review.model';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() packageId!: number;
  reviews$!: Observable<Review[]>;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewsService.getReviewsForPackage(this.packageId);
  }

  trackById(index: number, item: Review): number {
    return item.reviewId;
  }
}